using BPGezinswetenschappen.API.Dtos.Project;
using System.Collections.Generic;

namespace BPGezinswetenschappen.API.Dtos.User
{
    public class UserDetailDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ProgramType { get; set; }
        public string UserLevel { get; set; }
        public string Expertise { get; set; }
        
        // Related entities
        public IEnumerable<ProjectReadDto> StudentProjects { get; set; }
        public IEnumerable<ProjectReadDto> CoachProjects { get; set; }
        public IEnumerable<TopicDto> Topics { get; set; }
    }
}
