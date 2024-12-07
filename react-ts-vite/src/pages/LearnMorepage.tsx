import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearnMorePage() {
  return (
    <>
    <header className="px-4 lg:px-6 h-14 flex items-center">
    <a className="flex items-center justify-center" href="/">
     <img className='w-6' src="/favicon.png" alt="" />
      <span className="ml-2 text-lg font-bold">BreastCancerPredictor</span>
    </a>
    
  </header>
    <div className="container mx-auto px-4 py-8">
    
      <h1 className="text-3xl font-bold mb-6 text-pink-500">Learn More About Our Breast Cancer Prediction Model</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Support Vector Classification (SVC)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Our machine learning model uses Support Vector Classification (SVC), a subclass of Support Vector Machines (SVM). SVC is particularly effective for breast cancer prediction due to its ability to handle complex, high-dimensional data.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">How SVC Works:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>SVC aims to find the hyperplane that best separates different classes (in this case, malignant and benign tumors) in a high-dimensional space.</li>
            <li>It maximizes the margin between the classes, which helps in achieving better generalization and reducing overfitting.</li>
            <li>SVC can use different kernel functions (e.g., linear, polynomial, radial basis function) to transform the input space, allowing for non-linear decision boundaries.</li>
            <li>It's particularly effective when the number of dimensions is greater than the number of samples, which is often the case in medical datasets.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Breast Cancer Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Our model predicts whether a breast mass is malignant (cancerous) or benign (non-cancerous) based on various features extracted from medical imaging data.</p>
          <p className="mt-2">Early detection of breast cancer significantly improves treatment outcomes and survival rates. By leveraging machine learning, we aim to assist medical professionals in making more accurate and timely diagnoses.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dataset Features</CardTitle>
          <CardDescription>Our model uses the following 30 features extracted from digitized images of fine needle aspirate (FNA) of breast masses:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness",
              "mean compactness", "mean concavity", "mean concave points", "mean symmetry",
              "mean fractal dimension", "radius error", "texture error", "perimeter error",
              "area error", "smoothness error", "compactness error", "concavity error",
              "concave points error", "symmetry error", "fractal dimension error",
              "worst radius", "worst texture", "worst perimeter", "worst area",
              "worst smoothness", "worst compactness", "worst concavity",
              "worst concave points", "worst symmetry", "worst fractal dimension"
            ].map((feature, index) => (
              <div key={index} className="bg-muted p-2 rounded">
                {feature}
              </div>
            ))}
          </div>
          <p className="mt-4">These features capture various characteristics of the cell nuclei present in the images, providing a comprehensive representation of the breast mass for accurate classification.</p>
        </CardContent>
      </Card>
    </div>
    </>
  )
}

