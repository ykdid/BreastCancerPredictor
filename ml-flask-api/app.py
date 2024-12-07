import os
from app import create_app
from model.train import train_and_save_model

model_path = "model/cancer_model.pkl"

if not os.path.exists(model_path):
    train_and_save_model()

app = create_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
