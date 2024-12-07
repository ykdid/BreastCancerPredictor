import joblib
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, mean_squared_error, r2_score

def train_and_save_model():
    data = load_breast_cancer()
    X, y = data.data, data.target

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test) 

    model = SVC(kernel='linear', random_state=42)
    model.fit(X_train_scaled, y_train)

    joblib.dump((model, scaler), "model/cancer_model.pkl")
    print("Model başarıyla kaydedildi.")

    y_pred = model.predict(X_test_scaled)

    accuracy = accuracy_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Accuracy: {accuracy:.4f}")
    print(f"MSE: {mse:.4f}")
    print(f"R²: {r2:.4f}")

if __name__ == "__main__":
    train_and_save_model()
