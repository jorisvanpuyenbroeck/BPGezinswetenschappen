using System;
using BPGezinswetenschappen.API.Dtos.Classroom;

namespace BPGezinswetenschappen.API.Dtos.Slot
{
    public class SlotReadDto
    {
        public int SlotId { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public int? PresentationDayId { get; set; }
        public int? ClassroomId { get; set; }
        public ClassroomReadDto? Classroom { get; set; }
        
    }
}
