using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.Slot;

namespace BPGezinswetenschappen.API.Dtos.ClassRoom
{
    public class ClassRoomDetailDto
    {
        public int ClassroomId { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
        
        public ICollection<SlotReadDto> Slots { get; set; }
    }
}
