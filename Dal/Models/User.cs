using System.ComponentModel.DataAnnotations.Schema;

namespace BPGezinswetenschappen.DAL.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? Sub { get; set; }
        public string? UserName { get; set; }
        public string? GivenName { get; set; }
        public string? FamilyName { get; set; }
        public string? Picture { get; set; }
        public string? Name { get; set; }
        public string? NickName { get; set; }
        public string? Password { get; set; }
        [NotMapped]
        public string? Token { get; set; }
        public string? Email { get; set; }
        public string? Application { get; set; }
        public Boolean? EmailVerified { get; set; }
        public string? ProgramType { get; set; }
        public string? UserLevel { get; set; }
        public string? Expertise { get; set; }

        // navigation property


        [InverseProperty("Student")]
        public ICollection<Project>? StudentProjects { get; set; }
        [InverseProperty("Coach")]
        public ICollection<Project>? CoachProjects { get; set; }
        public ICollection<Topic>? Topics { get; set; }


    }
}
