using System.ComponentModel.DataAnnotations.Schema;

namespace BPGezinswetenschappen.DAL.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Password { get; set; }
        [NotMapped]
        public string? Token { get; set; }
        public string? Email { get; set; }
        public string? ProgramType { get; set; }
        public string? UserLevel { get; set; }
        public string? Expertise { get; set; }

        // navigation property

        // [InverseProperty("Student")]
        public ICollection<Project>? StudentProjects { get; set; }
        // [InverseProperty("Coach")]
        public ICollection<Project>? CoachProjects { get; set; }

        public ICollection<UserTopic>? UserTopics { get; set; }


    }
}
