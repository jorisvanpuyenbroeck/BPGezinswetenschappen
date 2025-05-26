using System;
using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.ClassRoom;
using BPGezinswetenschappen.API.Dtos.PresentationDay;
using BPGezinswetenschappen.API.Dtos.PresentationSlot;
using BPGezinswetenschappen.API.Dtos.UserSlot;

namespace BPGezinswetenschappen.API.Dtos.Slot
{
    public class SlotDetailDto
    {
        public int SlotId { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        
        public int? PresentationDayId { get; set; }
        public PresentationDayReadDto PresentationDay { get; set; }
        
        public int? ClassRoomId { get; set; }
        public ClassRoomReadDto Classroom { get; set; }
        
        public ICollection<PresentationSlotReadDto> Presentations { get; set; }
        public ICollection<UserSlotReadDto> Availabilities { get; set; }
    }
}
