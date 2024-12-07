using BreastCancerAPI.Entities;
using BreastCancerAPI.Repository.UserRepository;
using BreastCancerAPI.Service.EncryptionService;

namespace BreastCancerAPI.Service.UserService;

public class UserService:IUserService
{
    private readonly IEncryptionService _encryptionService;
    private readonly IUserRepository _userRepository;

    public UserService(IEncryptionService encryptionService, IUserRepository userRepository)
    {
        _encryptionService = encryptionService;
        _userRepository = userRepository;
    }
    
    public async Task<bool> ChangePasswordById(int id, string currentPassword, string newPassword)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user ==  null || !_encryptionService.VerifyHash(currentPassword,user.HashPassword))
        {
            return false;
        }

        user.HashPassword = _encryptionService.Hash(newPassword.Trim());
        await _userRepository.UpdateAsync(user);
        return true;
    }
    
    public async Task<User> GetUserById(int id)
    {
        if (id <= 0)
        {
            throw new ArgumentException("Invalid User ID.");
        }

        var user =  await _userRepository.GetByIdAsync(id);

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {id} not found.");
        }

        user.Email = _encryptionService.Decrypt(user.Email);
        return user;
    }
    
    public async Task<bool> DeleteUserById(int id)
    {
        if (id <= 0)
        {
            throw new ArgumentException("Invalid user ID.");
        }

        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {id} not found.");
        }

        await _userRepository.DeleteAsync(id);
        
        return true;
    }
    
    public async Task<User> UpdateUserById(int id,User user)
    {
        if (id <= 0)
        {
            throw new ArgumentException("Invalid user ID.");
        }
        
        if (user == null)
        {
            throw new ArgumentNullException(nameof(user), "Updated user object cannot be null.");
        }
        
        var existingUser = await _userRepository.GetByIdAsync(id);

        if (existingUser == null)
        {
            throw new KeyNotFoundException($"User with ID {id} not found.");
        }
        
        if (!string.IsNullOrWhiteSpace(user.UserName))
        {
            existingUser.UserName = user.UserName.Trim();
        }
        
        if (!string.IsNullOrWhiteSpace(user.Email))
        {
            existingUser.Email = _encryptionService.Encrypt(user.Email.Trim());
        }
        
        await _userRepository.UpdateAsync(existingUser);

        return existingUser;
    }
}