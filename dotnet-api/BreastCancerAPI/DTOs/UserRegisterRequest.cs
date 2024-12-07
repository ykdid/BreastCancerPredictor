using System.ComponentModel.DataAnnotations;

namespace BreastCancerAPI.DTOs;

public class UserRegisterRequest
{
    [Required]
    public string UserName { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string HashPassword { get; set; }
}