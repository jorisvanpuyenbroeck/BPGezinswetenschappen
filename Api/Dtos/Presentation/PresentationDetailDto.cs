using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.PresentationSlot;
using BPGezinswetenschappen.API.Dtos.User;

namespace BPGezinswetenschappen.API.Dtos.Presentation
{
    public class PresentationDetailDto
    {
        public int PresentationId { get; set; }
        
        public int StudentId { get; set; }
        public UserReadDto Student { get; set; }
        
        public int CoachId { get; set; }
        public UserReadDto Coach { get; set; }
        
        public int? ExpertId { get; set; }
        public UserReadDto Expert { get; set; }
        
        public ICollection<PresentationSlotReadDto> Slots { get; set; }
    }
}
