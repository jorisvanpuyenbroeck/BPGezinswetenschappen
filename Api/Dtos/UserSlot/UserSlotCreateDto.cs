using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.UserSlot
{
    public class UserSlotCreateDto
    {
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int SlotId { get; set; }
        
        public int? RoleId { get; set; }
    }
}
