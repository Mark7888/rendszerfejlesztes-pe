from flask import Flask, render_template, Response, request, redirect, url_for, make_response
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sock import Sock
import redis
import threading
import gevent
from websocket import connections, listen_for_notifications, send_alert
import hashlib
import json
from database_manager import DatabaseManager, APP_SECRET

app = Flask(
    __name__,
    static_url_path='',
    static_folder='static',
    template_folder='templates'
)
app.config['SECRET_KEY'] = APP_SECRET

sock = Sock(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


def generate_hash(string):
    # generate sha256 hash of the string
    sha_signature = hashlib.sha256(string.encode()).hexdigest()
    return sha_signature


class User(UserMixin):
    def __init__(self, id):
        self.id = id
    def check_password(self, password):
        database_manager = DatabaseManager()

        user = database_manager.get_user(self.id)
        return user['password'] == password


@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect('/?login=1')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@login_manager.user_loader
def load_user(user_id):
    return User(user_id)


@app.route('/', methods=['GET'])
def index():
    is_login = request.args.get('login') == '1'
    login_error = request.args.get('login_error') == '1'

    if current_user.is_authenticated:
        resp = make_response(render_template('index.html'))
        resp.set_cookie('loggedInUser', current_user.id)
        return resp

    return render_template('index.html', login=is_login, login_error=login_error)

@app.route('/', methods=['POST'])
def index_login():
    username = request.form.get('username')
    password = request.form.get('password')

    user = User(username)
    if user.check_password(password):
        login_user(user)
        return redirect(url_for('index'))

    return redirect(url_for('index') + '?login=1&login_error=1')


@app.route('/blog', methods=['GET'])
@login_required
def blog():
    resp = make_response(render_template('blog.html'))
    resp.set_cookie('loggedInUser', current_user.id)
    return resp

@app.route('/get_topics', methods=['GET'])
@login_required
def get_topics():
    database_manager = DatabaseManager()

    type_id = request.args.get('type_id')
    if type_id:
        topics = database_manager.get_topics_by_type(type_id)
    else:
        topics = database_manager.get_topics()
    
    favorites = database_manager.get_favorite_topics(current_user.id)

    for t in topics:
        t['comments'] = []
        if t['id'] in favorites:
            t['favorite'] = True
    
    return Response(json.dumps({'topics': topics}), mimetype='application/json')

@app.route('/get_topic_types', methods=['GET'])
@login_required
def get_topic_types():
    database_manager = DatabaseManager()

    topic_types = database_manager.get_topic_types()
    return Response(json.dumps({'topic_types': topic_types}), mimetype='application/json')

@app.route('/get_comments', methods=['GET'])
@login_required
def get_comments():
    database_manager = DatabaseManager()

    topic_id = request.args.get('topic_id')
    comments = database_manager.get_comments(topic_id)
    return Response(json.dumps({'comments': comments}), mimetype='application/json')

@app.route('/add_comment', methods=['POST'])
@login_required
def add_comment():
    database_manager = DatabaseManager()

    topic_id = request.form.get('topic_id')
    comment = request.form.get('comment')
    if not comment or not topic_id:
        return Response(json.dumps({'status': 'error', 'message': 'Invalid comment'}), mimetype='application/json')

    # get logged in username
    username = current_user.id
    database_manager.add_comment(username, topic_id, comment)

    # notify users on commend
    targeted_users = database_manager.get_users_favorited_topic(topic_id)
    topic_title = database_manager.get_topic(topic_id)['name']

    title = f"New comment on topic: {topic_title}"
    text = f"{username} commented on topic: '{comment}'"

    send_alert(title, text, targeted_users)

    return Response(json.dumps({'status': 'success'}), mimetype='application/json')


@app.route('/add_favorite', methods=['POST'])
@login_required
def add_favorite():
    database_manager = DatabaseManager()

    topic_id = request.form.get('topic_id')
    if not topic_id:
        return Response(json.dumps({'status': 'error', 'message': 'Invalid topic'}), mimetype='application/json')

    # get logged in username
    username = current_user.id
    database_manager.add_favorite_topic(username, topic_id)

    return Response(json.dumps({'status': 'success'}), mimetype='application/json')

@app.route('/remove_favorite', methods=['POST'])
@login_required
def remove_favorite():
    database_manager = DatabaseManager()

    topic_id = request.form.get('topic_id')
    if not topic_id:
        return Response(json.dumps({'status': 'error', 'message': 'Invalid topic'}), mimetype='application/json')

    # get logged in username
    username = current_user.id
    database_manager.remove_favorite_topic(username, topic_id)

    return Response(json.dumps({'status': 'success'}), mimetype='application/json')

@app.route('/get_topics_commented', methods=['GET'])
@login_required
def get_topics_commented():
    database_manager = DatabaseManager()

    username = current_user.id
    topics = database_manager.get_topics_commented(username)
    return Response(json.dumps({'topics': topics}), mimetype='application/json')


# Websocket alert
threading.Thread(target=listen_for_notifications).start()

@sock.route('/websocket')
def websocket(ws):
    if not current_user.is_authenticated:
        return

    connections[current_user.id] = ws
    while True:
        gevent.sleep(0.1)

@app.route('/send_notification', methods=['POST'])
def send_notification():
    send_alert(request.form.get('title'), request.form.get('message'), [request.form.get('user')])
    return Response(json.dumps({'status': 'success'}), mimetype='application/json')


# DEBUG
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True, use_reloader=False)
