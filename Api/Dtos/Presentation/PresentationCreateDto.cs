using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Presentation
{
    public class PresentationCreateDto
    {
        [Required]
        public int StudentId { get; set; }
        
        [Required]
        public int CoachId { get; set; }
        
        public int? ExpertId { get; set; }
    }
}
