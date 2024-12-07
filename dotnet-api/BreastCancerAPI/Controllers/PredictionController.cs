using BreastCancerAPI.DTOs;
using BreastCancerAPI.Service.PredictionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BreastCancerAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]

public class PredictionController : ControllerBase
{
    private readonly IPredictionService _predictionService;
    
    public PredictionController(IPredictionService predictionService)
    {
        _predictionService = predictionService;
    }
    
    [HttpPost("predict")]
    public async Task<IActionResult> MakePrediction([FromBody] PredictionRequest request)
    {
        try
        {
            if (request == null)
                return BadRequest("Prediction request cannot be null.");

            var predictionResult = await _predictionService.MakePredictionAsync(request);

            return Ok(predictionResult);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    [HttpGet("user-predictions/{userId}")]
    public async Task<IActionResult> GetUserPredictions([FromRoute] int userId)
    {
        try
        {
            var predictions = await _predictionService.GetPredictionsByUserIdAsync(userId);

            if (predictions == null || !predictions.Any())
                return NotFound("No predictions found for this user.");

            return Ok(predictions);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
   
}