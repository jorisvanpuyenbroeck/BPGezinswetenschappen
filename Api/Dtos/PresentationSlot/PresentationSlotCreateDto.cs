using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.PresentationSlot
{
    public class PresentationSlotCreateDto
    {
        [Required]
        public int PresentationId { get; set; }
        
        [Required]
        public int SlotId { get; set; }
    }
}
