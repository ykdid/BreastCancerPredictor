using BreastCancerAPI.Entities;
using BreastCancerAPI.Repositories.Database;
using BreastCancerAPI.Repositories.GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace BreastCancerAPI.Repository.UserRepository;

public class UserRepository: Repository<User>, IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context) :base(context)
    {
        _context = context;
    }
    
    public async Task<User?> GetUserByEmail(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
    
    public async Task<User?> GetUserByUserName(string userName)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
    }
}