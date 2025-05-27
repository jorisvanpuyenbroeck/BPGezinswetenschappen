using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Classroom
{
    public class ClassroomCreateDto
    {
        [Required]
        public string Name { get; set; }
        
        public string Level { get; set; }
    }
}
