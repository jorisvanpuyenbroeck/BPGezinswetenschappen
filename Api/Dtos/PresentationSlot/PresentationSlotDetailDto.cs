using BPGezinswetenschappen.API.Dtos.Presentation;
using BPGezinswetenschappen.API.Dtos.Slot;

namespace BPGezinswetenschappen.API.Dtos.PresentationSlot
{
    public class PresentationSlotDetailDto
    {
        public int PresentationId { get; set; }
        public PresentationReadDto Presentation { get; set; }
        
        public int SlotId { get; set; }
        public SlotReadDto Slot { get; set; }
    }
}
