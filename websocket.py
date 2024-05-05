import json
import redis

r = redis.Redis(host='redis', port=6379, db=0)

connections = {}

def event_stream():
    pubsub = r.pubsub()
    pubsub.subscribe('notifications')
    for message in pubsub.listen():
        if message['type'] == 'message':
            data = message['data'].decode('utf-8')
            yield data

def send_to_all_users(message):
    msg_data = json.loads(message)

    for userid in list(connections.keys()):
        if userid not in msg_data['targeted_users']:
            continue

        ws = connections[userid]

        if ws.connected:
            ws.send(message)
        else:
            del connections[userid]


def listen_for_notifications():
    for message in event_stream():
        send_to_all_users(message)

def send_alert(title, text, targetted_users):
    message = {
        'title': title,
        'text': text,
        'targeted_users': targetted_users
    }
    r.publish('notifications', json.dumps(message))
