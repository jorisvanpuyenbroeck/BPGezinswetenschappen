using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.ExamPeriod
{
    public class ExamPeriodCreateDto
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public int YearId { get; set; }
    }
}
