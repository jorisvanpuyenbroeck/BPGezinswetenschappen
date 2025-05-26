using System;

namespace BPGezinswetenschappen.API.Dtos.Slot
{
    public class SlotUpdateDto
    {
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public int? PresentationDayId { get; set; }
        public int? ClassRoomId { get; set; }
    }
}
