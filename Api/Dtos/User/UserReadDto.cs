using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.User
{
    public class UserReadDto
    {        public int UserId { get; set; }
        public string UserName { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        public string Email { get; set; }
        public string ProgramType { get; set; }
        public string UserLevel { get; set; }
        public string Expertise { get; set; }
        // Note: Password is excluded for security reasons
    }
}
