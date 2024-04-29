from os import getenv
from datetime import datetime
from dateutil.relativedelta import relativedelta
from base64 import b64encode, b64decode

from mysql.connector import connect as dbconnect

from dotenv import load_dotenv
load_dotenv()


MYSQL_HOST = getenv("MYSQL_HOST")
MYSQL_PORT = getenv("MYSQL_PORT")
MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASSWORD = getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = getenv("MYSQL_DATABASE")

class DatabaseManager:
    def __init__(self):
        self.connection = dbconnect(
            host=MYSQL_HOST,
            port=MYSQL_PORT,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DATABASE
        )
        self.cursor = self.connection.cursor()

        self.create_tables()

    def create_tables(self):
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Users (Username VARCHAR(255) PRIMARY KEY, Name VARCHAR(255), Password VARCHAR(255)) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS TopicTypes (Id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255)) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Topics (Id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), TypeId INT, Description TEXT, FOREIGN KEY (TypeId) REFERENCES TopicTypes(Id)) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS FavoriteTopics (Username VARCHAR(255), TopicId INT, FOREIGN KEY (Username) REFERENCES Users(Username), FOREIGN KEY (TopicId) REFERENCES Topics(Id)) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Comments (Id INT AUTO_INCREMENT PRIMARY KEY, Username VARCHAR(255), TopicId INT, Body TEXT, Timestamp DATETIME(3), FOREIGN KEY (Username) REFERENCES Users(Username), FOREIGN KEY (TopicId) REFERENCES Topics(Id)) ENGINE=InnoDB;")
        self.connection.commit()

    def get_connection(self):
        return self.connection

    def get_cursor(self):
        return self.cursor

    def get_user(self, username):
        self.cursor.execute("SELECT * FROM Users WHERE Username = %s", (username,))
        user_data = self.cursor.fetchone()

        json_data = {
            "username": user_data[0],
            "name": user_data[1],
            "password": user_data[2]
        }

        return json_data
    
    def get_topics(self):
        self.cursor.execute("SELECT * FROM Topics")
        topics_data = self.cursor.fetchall()

        topics = []
        for topic_data in topics_data:
            topics.append({
                "id": topic_data[0],
                "title": topic_data[1],
                "type_id": topic_data[2],
                "content": topic_data[3]
            })
        
        return topics

    def get_topics_by_type(self, type_id):
        self.cursor.execute("SELECT * FROM Topics WHERE TypeId = %s", (type_id,))
        topics_data = self.cursor.fetchall()

        topics = []
        for topic_data in topics_data:
            topics.append({
                "id": topic_data[0],
                "name": topic_data[1],
                "type_id": topic_data[2],
                "description": topic_data[3]
            })
        
        return topics

    def get_topic(self, topic_id):
        self.cursor.execute("SELECT * FROM Topics WHERE Id = %s", (topic_id,))
        topic_data = self.cursor.fetchone()

        topic = {
            "id": topic_data[0],
            "name": topic_data[1],
            "type_id": topic_data[2],
            "description": topic_data[3]
        }

        return topic
    
    def get_comments(self, topic_id):
        self.cursor.execute("SELECT * FROM Comments WHERE TopicId = %s", (topic_id,))
        comments_data = self.cursor.fetchall()

        comments = []
        for comment_data in comments_data:
            comments.append({
                "id": comment_data[0],
                "username": comment_data[1],
                "topic_id": comment_data[2],
                "body": comment_data[3],
                "timestamp": comment_data[4].strftime("%Y-%m-%d %H:%M:%S")
            })
        
        return comments
    
    def add_comment(self, username, topic_id, body):
        self.cursor.execute("INSERT INTO Comments (Username, TopicId, Body, Timestamp) VALUES (%s, %s, %s, %s)", (username, topic_id, body, datetime.now()))
        self.connection.commit()
    
    def get_favorite_topics(self, username):
        self.cursor.execute("SELECT * FROM FavoriteTopics WHERE Username = %s", (username,))
        favorites_data = self.cursor.fetchall()

        favorites = []
        for favorite_data in favorites_data:
            favorites.append(favorite_data[1])

        return favorites
    
    def add_favorite_topic(self, username, topic_id):
        self.cursor.execute("INSERT INTO FavoriteTopics (Username, TopicId) VALUES (%s, %s)", (username, topic_id))
        self.connection.commit()
    
    def remove_favorite_topic(self, username, topic_id):
        self.cursor.execute("DELETE FROM FavoriteTopics WHERE Username = %s AND TopicId = %s", (username, topic_id))
        self.connection.commit()

    def get_topic_types(self):
        self.cursor.execute("SELECT * FROM TopicTypes")
        types_data = self.cursor.fetchall()

        types = []
        for type_data in types_data:
            types.append({
                "id": type_data[0],
                "name": type_data[1]
            })

        return types

    def get_topics_commented(self, username):
        self.cursor.execute("SELECT DISTINCT TopicId FROM Comments WHERE Username = %s", (username,))
        topics_data = self.cursor.fetchall()

        topics = []
        for topic_data in topics_data:
            topics.append(topic_data[0])

        return topics