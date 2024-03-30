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
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Users (Id INT AUTO_INCREMENT PRIMARY KEY, Username VARCHAR(255) UNIQUE, Name VARCHAR(255), Password VARCHAR(255)) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Topics (Id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), TypeId INT, Description TEXT) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS FavoriteTopics (UserId INT, TopicId INT, FOREIGN KEY (UserId) REFERENCES Users(Id), FOREIGN KEY (TopicId) REFERENCES Topics(Id)) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS TopicTypes (Id INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255), FOREIGN KEY (Id) REFERENCES Topics(TypeId)) ENGINE=InnoDB;")
        self.cursor.execute("CREATE TABLE IF NOT EXISTS Comments (Id INT AUTO_INCREMENT PRIMARY KEY, UserId INT, TopicId INT, Body TEXT, Timestamp DATETIME(3), FOREIGN KEY (UserId) REFERENCES Users(Id), FOREIGN KEY (TopicId) REFERENCES Topics(Id)) ENGINE=InnoDB;")
        self.connection.commit()

    def get_connection(self):
        return self.connection

    def get_cursor(self):
        return self.cursor
