from flask import Flask
from config.config import Config
from dotenv import load_dotenv
import os

def create_app():
    # Explicitly load .env file
    load_dotenv()
    
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Register blueprints
    from app.routes import main
    app.register_blueprint(main)
    
    return app
