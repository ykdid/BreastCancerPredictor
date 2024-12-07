using BreastCancerAPI.DTOs;
using BreastCancerAPI.Entities;
using BreastCancerAPI.Service.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BreastCancerAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]

public class UserController:ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("get-user/{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        try
        {
            var user = await _userService.GetUserById(id);
            return Ok(user);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpDelete("delete-user/{id}")]
    public async Task<IActionResult> DeleteUserById(int id)
    {
        try
        {
            var result = await _userService.DeleteUserById(id);
            if (result)
            {
                return Ok(new { Message = "User deleted successfully." });
            }
            return BadRequest("Failed to delete user.");
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPatch("change-password/{id}")]
    public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePassword changePassword)
    {
        if (changePassword == null || string.IsNullOrWhiteSpace(changePassword.CurrentPassword) || string.IsNullOrWhiteSpace(changePassword.NewPassword))
        {
            return BadRequest("Invalid password change request.");
        }

        try
        {
            var isPasswordChanged = await _userService.ChangePasswordById(id, changePassword.CurrentPassword, changePassword.NewPassword);
            if (isPasswordChanged)
            {
                return Ok(new { Message = "Password changed successfully." });
            }
            return BadRequest("Current password is incorrect.");
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPatch("update-user/{id}")]
    public async Task<IActionResult> UpdateUserById(int id, [FromBody] User user)
    {
        try
        {
            var updatedUser = await _userService.UpdateUserById(id, user);
            return Ok(updatedUser);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}