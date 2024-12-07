using BreastCancerAPI.DTOs;

namespace BreastCancerAPI.Service.AuthService;

public interface IAuthService
{
    Task<AuthResponse> Register(UserRegisterRequest request);
    Task<AuthResponse> Login(UserLoginRequest request);
}
