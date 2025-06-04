using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.User
{
    public class UserCreateDto
    {
        [Required]        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }
        
        public string GivenName { get; set; }
        
        public string FamilyName { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        public string ProgramType { get; set; }
        
        public string UserLevel { get; set; }
        
        public string Expertise { get; set; }
    }
}
