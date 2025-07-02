from app import create_app
import os

# Create the Flask application
app = create_app()

# Vercel expects the app to be available as 'app'
# This is the entry point for Vercel
if __name__ == '__main__':
    # This will only run locally
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
