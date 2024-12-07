using System.Text.Json;
using BreastCancerAPI.DTOs;
using BreastCancerAPI.Entities;
using BreastCancerAPI.Repositories.GenericRepository;
using BreastCancerAPI.Service.ModelApiClientService;
using System.Linq;


namespace BreastCancerAPI.Service.PredictionService;

public class PredictionService:IPredictionService
{
    private readonly IModelApiClientService _modelApiClientService;
    private readonly IRepository<PredictionResult> _repository;
    
    public PredictionService(IModelApiClientService modelApiClientService, IRepository<PredictionResult> repository)
    {
        _modelApiClientService = modelApiClientService;
        _repository = repository;
    }
    
    public async Task<PredictionResult> MakePredictionAsync(PredictionRequest request)
    {
      

        var predictResponse = await _modelApiClientService.GetPredictionAsync(request.Features);
        var metricsResponse = await _modelApiClientService.GetMetricsAsync();
        
        var result = new PredictionResult
        {
            UserId = request.UserId,
            Features = request.Features,
            Prediction = predictResponse.Prediction,
            Accuracy = metricsResponse.Accuracy,
            Mse = metricsResponse.Mse,
            R2 = metricsResponse.R2
        };
        
        await _repository.AddAsync(result);

        return result;
    }
    
    public async Task<IEnumerable<PredictionResult>> GetPredictionsByUserIdAsync(int userId)
    {
        var predictions = await _repository.GetAllAsync(pr => pr.UserId == userId);
        
        return predictions.OrderByDescending(pr => pr.Id).ToList();
    }

}