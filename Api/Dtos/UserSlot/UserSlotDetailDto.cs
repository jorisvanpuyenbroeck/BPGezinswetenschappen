using BPGezinswetenschappen.API.Dtos.Role;
using BPGezinswetenschappen.API.Dtos.Slot;
using BPGezinswetenschappen.API.Dtos.User;

namespace BPGezinswetenschappen.API.Dtos.UserSlot
{
    public class UserSlotDetailDto
    {
        public int UserId { get; set; }
        public UserReadDto User { get; set; }
        
        public int SlotId { get; set; }
        public SlotReadDto Slot { get; set; }
        
        public int? RoleId { get; set; }
        public RoleReadDto Role { get; set; }
    }
}
