using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.User;
using BPGezinswetenschappen.API.Dtos.UserSlot;

namespace BPGezinswetenschappen.API.Dtos.Role
{
    public class RoleDetailDto
    {
        public int RoleId { get; set; }
        public string Name { get; set; }
        
        public ICollection<UserReadDto> Users { get; set; }
        public ICollection<UserSlotReadDto> UserSlots { get; set; }
    }
}
