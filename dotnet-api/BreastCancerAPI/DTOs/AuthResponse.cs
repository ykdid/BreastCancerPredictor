namespace BreastCancerAPI.DTOs;

public class AuthResponse
{
    public int Id { get; set; }
    public bool IsSuccess { get; set; }
    public string Token { get; set; }
    public string ErrorMessage { get; set; }
}