from flask import Blueprint, request, jsonify
from model.predict import load_model, predict, evaluate_model
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

main = Blueprint('main', __name__)

model, scaler = load_model()

data = load_breast_cancer()
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

@main.route('/predict', methods=['POST'])
def predict_route():
    try:
        data = request.json

        if 'features' not in data:
            return jsonify({"error": "Features are missing from the input data."}), 400
        
        if not isinstance(data['features'], list):
            return jsonify({"error": "Features should be a list."}), 400

        features = data['features']

        prediction = predict(model, scaler, features)

        response = {
            "prediction": "Benign" if prediction == 1 else "Malignant"
        }

        return jsonify(response)
    except KeyError as e:
        return jsonify({"error": f"Missing key in input data: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@main.route('/metrics', methods=['GET'])
def metrics_route():
    try:
        accuracy, mse, r2 = evaluate_model(model, scaler, X_test, y_test)

        response = {
            "accuracy": round(accuracy, 2),
            "mse": round(mse, 2),
            "r2": round(r2, 2)
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
