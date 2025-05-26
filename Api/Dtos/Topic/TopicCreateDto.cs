using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Topic
{
    public class TopicCreateDto
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; }
        
        public string Description { get; set; }
    }
}
