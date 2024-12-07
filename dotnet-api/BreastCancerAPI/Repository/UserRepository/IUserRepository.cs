using BreastCancerAPI.Entities;
using BreastCancerAPI.Repositories.GenericRepository;

namespace BreastCancerAPI.Repository.UserRepository;

public interface IUserRepository:IRepository<User>
{
    Task<User?> GetUserByEmail(string email);
    Task<User?> GetUserByUserName(string userName);
}