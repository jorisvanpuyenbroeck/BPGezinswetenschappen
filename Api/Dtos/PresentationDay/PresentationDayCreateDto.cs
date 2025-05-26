using System;
using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.PresentationDay
{
    public class PresentationDayCreateDto
    {
        [Required]
        public DateTime Date { get; set; }
        
        [Required]
        public int ExamPeriodId { get; set; }
    }
}
