using System;
using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Slot
{
    public class SlotCreateDto
    {
        [Required]
        public TimeOnly StartTime { get; set; }
        
        [Required]
        public TimeOnly EndTime { get; set; }
        
        public int? PresentationDayId { get; set; }
        
        public int? ClassroomId { get; set; }
    }
}
