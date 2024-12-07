    namespace BreastCancerAPI.Entities;

    public class PredictionResult
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double[] Features { get; set; }
        public string Prediction { get; set; }
        public double Accuracy { get; set; }
        public double Mse { get; set; }
        public double R2 { get; set; }
    }