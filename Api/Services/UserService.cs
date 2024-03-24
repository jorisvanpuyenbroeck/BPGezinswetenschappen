using BPGezinswetenschappen.API.Helpers;
using BPGezinswetenschappen.DAL.Data;
using BPGezinswetenschappen.DAL.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BPGezinswetenschappen.API.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly BPContext _BPContext;

        public UserService(IOptions<AppSettings> appSettings, BPContext BPContext)
        {
            _appSettings = appSettings.Value;
            _BPContext = BPContext;
        }

        public User Authenticate(string username, string password)
        {
            var user = _BPContext.Users.SingleOrDefault(x =>
                          x.UserName == username &&
                          x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId", user.UserId.ToString()),
                    //new Claim("Email", user.Email),
                    new Claim("UserName", user.UserName)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }
    }
}

