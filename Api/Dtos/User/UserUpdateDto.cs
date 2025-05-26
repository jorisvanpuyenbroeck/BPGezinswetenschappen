using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.User
{
    public class UserUpdateDto
    {
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        // Optional for updates - only update if provided
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }
        
        public string ProgramType { get; set; }
        
        public string UserLevel { get; set; }
        
        public string Expertise { get; set; }
    }
}
