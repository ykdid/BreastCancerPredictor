import { useState,useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AuthContext } from "@/context/AuthContext"
import axios from "axios";


// Feature adları
const FEATURE_NAMES = [
  "mean radius",
  "mean texture",
  "mean perimeter",
  "mean area",
  "mean smoothness",
  "mean compactness",
  "mean concavity",
  "mean concave points",
  "mean symmetry",
  "mean fractal dimension",
  "radius error",
  "texture error",
  "perimeter error",
  "area error",
  "smoothness error",
  "compactness error",
  "concavity error",
  "concave points error",
  "symmetry error",
  "fractal dimension error",
  "worst radius",
  "worst texture",
  "worst perimeter",
  "worst area",
  "worst smoothness",
  "worst compactness",
  "worst concavity",
  "worst concave points",
  "worst symmetry",
  "worst fractal dimension",
];

interface PredictionResult {
  predict: "benign" | "malignant";
  accuracy: number;
  mse: number;
  r2: number;
}

export default function MakePredictionPage() {
  const [features, setFeatures] = useState<number[]>(Array(FEATURE_NAMES.length).fill(0));
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { userId } = useContext(AuthContext);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = Number(value);
    setFeatures(newFeatures);
  };

  const handleApply = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8082/api/Prediction/predict",
        {
          userId,
          features,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setResult({
        predict: data.prediction.toLowerCase(),
        accuracy: data.accuracy,
        mse: data.mse,
        r2: data.r2,
      });
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-pink-500">Make a Prediction</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter Feature Values</CardTitle>
          <CardDescription>
            Please input the values for all features to make a breast cancer prediction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`feature-${index}`}>{FEATURE_NAMES[index]}</Label>
                  <Input
                    id={`feature-${index}`}
                    type="number"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Enter value for ${FEATURE_NAMES[index]}`}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button onClick={handleApply} className="w-full">
            Apply Prediction
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prediction</Label>
                <p className={`text-2xl font-bold ${result.predict === "benign" ? "text-green-600" : "text-red-600"}`}>
                  {result.predict.charAt(0).toUpperCase() + result.predict.slice(1)}
                </p>
              </div>
              <div>
                <Label>Accuracy</Label>
                <p className="text-2xl font-bold">{(result.accuracy * 100).toFixed(2)}%</p>
              </div>
              <div>
                <Label>Mean Squared Error (MSE)</Label>
                <p className="text-2xl font-bold">{result.mse.toFixed(4)}</p>
              </div>
              <div>
                <Label>R-squared (R2)</Label>
                <p className="text-2xl font-bold">{result.r2.toFixed(4)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
