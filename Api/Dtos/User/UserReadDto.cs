using System.ComponentModel.DataAnnotations;
using BPGezinswetenschappen.API.Dtos.Organisation;

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
        public int? OrganisationId { get; set; }
        public OrganisationReadDto? Organisation { get; set; }

        // Note: Password is excluded for security reasons
    }
}
