using Microsoft.AspNetCore.Mvc;
using BreastCancerAPI.Service.AuthService;
using BreastCancerAPI.DTOs;

namespace BreastCancerAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController:ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }   

        var result = await _authService.Register(request);
        if (!result.IsSuccess)
        {
            return BadRequest(result.ErrorMessage);
        }

        return Ok(result);
    }
        
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authService.Login(request);
        if (!result.IsSuccess)
        {
            return Unauthorized(result.ErrorMessage);
        }

        return Ok(result);
    }
}