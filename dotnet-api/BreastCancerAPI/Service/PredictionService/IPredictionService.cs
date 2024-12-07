using BreastCancerAPI.DTOs;
using BreastCancerAPI.Entities;

namespace BreastCancerAPI.Service.PredictionService;

public interface IPredictionService
{
    Task<PredictionResult> MakePredictionAsync(PredictionRequest request);
    Task<IEnumerable<PredictionResult>> GetPredictionsByUserIdAsync(int userId);
}