using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BPGezinswetenschappen.DAL.Models;

namespace DAL.Models
{
    public class UserSlot
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int SlotId { get; set; }
        public Slot Slot { get; set; } = null!;

        public int? RoleId { get; set; }
        public Role? Role { get; set; }

    }
}
