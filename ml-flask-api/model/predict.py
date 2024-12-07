import joblib
from sklearn.metrics import accuracy_score, mean_squared_error, r2_score

def load_model():
    model, scaler = joblib.load("model/cancer_model.pkl")
    return model, scaler

def predict(model, scaler, features):
    
    features_scaled = scaler.transform([features])
    prediction = model.predict(features_scaled)[0]
    return prediction

def evaluate_model(model, scaler, X_test, y_test):
    
    X_test_scaled = scaler.transform(X_test)
    y_pred = model.predict(X_test_scaled)

    accuracy = accuracy_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    return accuracy, mse, r2
