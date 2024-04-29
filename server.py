from flask import Flask, render_template, Response, request, redirect, url_for, make_response
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, Email, EqualTo
import hashlib
import json

app = Flask(
    __name__,
    static_url_path='',
    static_folder='static',
    template_folder='templates'
)
app.config['SECRET_KEY'] = 'your-secret-key'  # replace 'your-secret-key' with your actual secret key

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
        # check the password from the database
        return password == 'password'  # replace 'password' with the actual password

class Topic:
    def __init__(self, name):
        self.id = generate_hash(name)
        self.name = name
        self.comments = []

class TopicContainer:
    def __init__(self):
        self.topics = []

    def add_topic(self, topic):
        self.topics.append(topic)

    def get_topics(self):
        return self.topics

class TopicComment:
    def __init__(self, comment, username, datetime):
        self.id = generate_hash(username + datetime + comment)
        self.comment = comment
        self.username = username
        self.datetime = datetime


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
    return render_template('blog.html')

@app.route('/get_topics', methods=['GET'])
@login_required
def get_topics():
    blog_topics = ['Technology', 'Travel', 'Fitness', 'Food', 'Fashion', 'Music', 'Lifestyle', 'Education', 'Finance', 'Healthcare', 'Sport', 'Gaming']
    return Response(json.dumps({'topics': blog_topics}), mimetype='application/json')

@app.route('/get_comments', methods=['GET'])
@login_required
def get_comments():
    topic_id = request.args.get('topic_id')
    return Response(json.dumps({'comments': ['comment1', 'comment2', 'comment3']}), mimetype='application/json')

@app.route('/add_comment', methods=['POST'])
@login_required
def add_comment():
    topic_id = request.form['topic_id']
    comment = request.form['comment']

    # get logged in username
    username = current_user.id

    return Response(json.dumps({'status': 'success'}), mimetype='application/json')

@app.route('/get_topics_commented', methods=['GET'])
@login_required
def get_topics_commented():
    # get the topics the logged in user commented on
    return Response(json.dumps({'topics': ['topic1', 'topic2']}), mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
