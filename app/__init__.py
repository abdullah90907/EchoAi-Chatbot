from flask import Flask
from config.config import Config
from dotenv import load_dotenv
import os

def create_app():
    # Explicitly load .env file (for local development)
    load_dotenv()
    
    # Create Flask app with correct static and template folders
    app = Flask(__name__, 
                static_folder='static',
                template_folder='templates')
    app.config.from_object(Config)
    
    # Register blueprints
    from app.routes import main
    app.register_blueprint(main)
    
    return app
