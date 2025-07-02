import os
from dotenv import load_dotenv

# Load environment variables from .env file with explicit path
env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(env_path)

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    GROQ_API_KEY = os.environ.get('GROQ_API_KEY')
    FLASK_ENV = os.environ.get('FLASK_ENV') or 'development'
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'
