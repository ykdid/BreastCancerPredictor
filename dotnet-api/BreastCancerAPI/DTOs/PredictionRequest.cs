namespace BreastCancerAPI.DTOs;

public class PredictionRequest
{
    public int UserId { get; set; }
    public double[] Features { get; set; }
}