using System.ComponentModel.DataAnnotations;

namespace BreastCancerAPI.DTOs;

public class UserLoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string HashPassword { get; set; }
}