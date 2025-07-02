#!/usr/bin/env python3
"""
EchoAI Development Setup Script
This script helps set up the development environment for EchoAI
"""

import os
import sys
import subprocess
import platform

def print_banner():
    """Print the EchoAI banner"""
    banner = """
    ╔═══════════════════════════════════════╗
    ║              🤖 EchoAI 🤖              ║
    ║    AI-Powered Content Generator       ║
    ║         Development Setup             ║
    ╚═══════════════════════════════════════╝
    """
    print(banner)

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8 or higher is required!")
        print(f"Current version: {version.major}.{version.minor}.{version.micro}")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} - Compatible")
    return True

def install_requirements():
    """Install Python requirements"""
    print("\n📦 Installing Python packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ All packages installed successfully!")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install packages")
        return False

def check_env_file():
    """Check if .env file exists and create one if not"""
    if not os.path.exists(".env"):
        print("\n📝 Creating .env file...")
        env_content = """# EchoAI Environment Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
GROQ_API_KEY=your_groq_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
"""
        with open(".env", "w") as f:
            f.write(env_content)
        print("✅ .env file created!")
        print("⚠️  Please update the GROQ_API_KEY in the .env file")
        return False
    else:
        print("✅ .env file exists")
        return True

def run_app():
    """Run the Flask application"""
    print("\n🚀 Starting EchoAI...")
    print("📍 The application will be available at: http://localhost:5000")
    print("🛑 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        subprocess.run([sys.executable, "run.py"])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")

def main():
    """Main setup function"""
    print_banner()
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Install requirements
    if not install_requirements():
        print("Please fix the package installation issues and try again.")
        sys.exit(1)
    
    # Check environment file
    env_ready = check_env_file()
    
    if not env_ready:
        print("\n⚠️  Please configure your .env file before starting the application.")
        print("Specifically, make sure to set your GROQ_API_KEY.")
        choice = input("\nDo you want to start the app anyway? (y/N): ").lower()
        if choice not in ['y', 'yes']:
            print("Setup complete! Run 'python setup.py' again when you're ready.")
            sys.exit(0)
    
    # Run the application
    run_app()

if __name__ == "__main__":
    main()
