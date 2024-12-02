import os
from dotenv import load_dotenv

dotenv_path = os.path.join(
    os.path.dirname(
    os.path.dirname(
    os.path.dirname(__file__))), '.env')

load_dotenv(dotenv_path)

class Config:
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    MONGO_URI = os.getenv('DATABASE_URL')
    SECRET_KEY = os.getenv('SECRET_KEY')
