from flask import Flask
from .routes import main
import logging

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main)
    logging.basicConfig(level=logging.INFO)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
