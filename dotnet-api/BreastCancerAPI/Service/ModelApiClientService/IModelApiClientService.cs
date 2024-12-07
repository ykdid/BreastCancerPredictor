using BreastCancerAPI.DTOs;

namespace BreastCancerAPI.Service.ModelApiClientService;

public interface IModelApiClientService
{
    Task<PredictResponse> GetPredictionAsync(double[] features);
    Task<MetricsResponse> GetMetricsAsync();
}