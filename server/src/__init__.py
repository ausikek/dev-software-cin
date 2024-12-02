from flask import Flask
from flask_pymongo import PyMongo
from .settings.config import Config

mongo = PyMongo()

app = Flask(__name__)

app.config.from_object(Config)

mongo.init_app(app)

from .views import views