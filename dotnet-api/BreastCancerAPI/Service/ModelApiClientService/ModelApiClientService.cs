using System.Text;
using BreastCancerAPI.DTOs;
using Newtonsoft.Json;

namespace BreastCancerAPI.Service.ModelApiClientService;

public class ModelApiClientService:IModelApiClientService
{
    private readonly HttpClient _httpClient;

    public ModelApiClientService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<PredictResponse> GetPredictionAsync(double[] features)
    {
        var flaskApiUrl = "http://flaskapi:5000/predict";
        
        var content = new StringContent(JsonConvert.SerializeObject(new 
        { 
            features = features 
        }), Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync(flaskApiUrl, content);

        if (!response.IsSuccessStatusCode)
            throw new Exception("Flask API error occurred.");

        var jsonResponse = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<PredictResponse>(jsonResponse);
    }
    
    public async Task<MetricsResponse> GetMetricsAsync()
    {
        var flaskApiUrl = "http://flaskapi:5000/metrics";

        var response = await _httpClient.GetAsync(flaskApiUrl);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Error occurred while calling Flask API for metrics.");
        }
   
        var jsonResponse = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<MetricsResponse>(jsonResponse);
    }
}