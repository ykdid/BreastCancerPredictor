using BreastCancerAPI.Entities;

namespace BreastCancerAPI.Service.UserService;

public interface IUserService
{
    Task<bool> ChangePasswordById(int userId, string currentPassword, string newPassword);
    Task<User> UpdateUserById(int id,User user);
    Task<bool> DeleteUserById(int id);
    Task<User> GetUserById(int id);
}