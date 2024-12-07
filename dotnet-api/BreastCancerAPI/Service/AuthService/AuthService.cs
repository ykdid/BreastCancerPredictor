using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BreastCancerAPI.Controllers;
using BreastCancerAPI.DTOs;
using BreastCancerAPI.Entities;
using BreastCancerAPI.Repositories.GenericRepository;
using BreastCancerAPI.Repository.UserRepository;
using BreastCancerAPI.Service.EncryptionService;
using Microsoft.IdentityModel.Tokens;

namespace BreastCancerAPI.Service.AuthService;

public class AuthService:IAuthService
{
    private readonly IEncryptionService _encryptionService;
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;

    public AuthService(
        IEncryptionService encryptionService,
        IConfiguration configuration,
        IUserRepository userRepository)
    {
        _encryptionService = encryptionService;
        _configuration = configuration;
        _userRepository = userRepository;
    }
    
    private string GenerateJwtToken(int userId)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        };

        var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryInMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    public async Task<AuthResponse> Register(UserRegisterRequest request)
    {
        var existingUser = await _userRepository.GetUserByEmail(_encryptionService.Encrypt(request.Email));
            
        if (existingUser != null)
        {
            return new AuthResponse { IsSuccess = false, ErrorMessage = "User already exists." };
        }

        var existingUserName = await _userRepository.GetUserByUserName(request.UserName);
        
        if (existingUserName != null)
        {
            return new AuthResponse { IsSuccess = false, ErrorMessage = "UserName already taken." };
        }
        
        if (request.UserName.Length < 3)
        {
            return new AuthResponse { IsSuccess = false, ErrorMessage = "UserName should be long enough." };
        }
            
        var user = new User
        {
            UserName = request.UserName.Trim(),
            Email = _encryptionService.Encrypt(request.Email),
            HashPassword = _encryptionService.Hash(request.HashPassword),
        };

        await _userRepository.AddAsync(user);
            
        var token = GenerateJwtToken(user.Id);
        return new AuthResponse { IsSuccess = true,  Token = token,Id = user.Id};
    }

    public async Task<AuthResponse> Login(UserLoginRequest request)
    {
        var encryptedEmail = _encryptionService.Encrypt(request.Email);

        var user = await _userRepository.GetUserByEmail(encryptedEmail);

        if (user!=null)
        {
            if (_encryptionService.VerifyHash(request.HashPassword, user.HashPassword))
            {
                var token = GenerateJwtToken(user.Id);
                return new AuthResponse { IsSuccess = true, Token = token, Id = user.Id};
            }
            else
            {
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Invalid password." };
            }
        }
        
        return new AuthResponse { IsSuccess = false, ErrorMessage = "Invalid email or password." };
    }
}