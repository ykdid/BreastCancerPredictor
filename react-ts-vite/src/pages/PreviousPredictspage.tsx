import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 

interface Prediction {
  id: number;
  features: number[];
  prediction: string;
  mse: number;
  accuracy: number;
  r2: number;
}

export default function PreviousPredictsPage() {
  const { userId } = useContext(AuthContext); 
  const [predictions, setPredictions] = useState<Prediction[]>([]); 

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/Prediction/user-predictions/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setPredictions(response.data); 
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    if (userId) {
      fetchPredictions();
    }
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-pink-500">Previous Predictions</h1>
      <div className="flex flex-col items-center space-y-6">
        {predictions.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>
    </div>
  );
}

function PredictionCard({ prediction }: { prediction: Prediction }) {
  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Prediction {prediction.id}</h2>
        <p className="text-gray-600 font-bold text-xl">Result: {prediction.prediction}</p>
      </div>
      <div className="mb-4">
        <p className="text-base">
          Accuracy: {(prediction.accuracy * 100).toFixed(2)}%
        </p>
        <p className="text-base">MSE: {prediction.mse.toFixed(4)}</p>
        <p className="text-base">R2 Score: {prediction.r2.toFixed(4)}</p>
      </div>
      <div>
        <details>
          <summary className="text-pink-500 cursor-pointer hover:underline">View Features</summary>
          <pre className="mt-2 text-sm bg-gray-50 p-4 rounded">
            {JSON.stringify(prediction.features, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
