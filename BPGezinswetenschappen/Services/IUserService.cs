using BPGezinswetenschappen.DAL.Models;

namespace BPGezinswetenschappen.API.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);

    }
}
