using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.ClassRoom
{
    public class ClassRoomCreateDto
    {
        [Required]
        public string Name { get; set; }
        
        public string Level { get; set; }
    }
}
