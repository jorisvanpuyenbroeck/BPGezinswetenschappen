using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BPGezinswetenschappen.DAL.Models;

namespace DAL.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<UserSlot> UserSlots { get; set; } = new List<UserSlot>();
    }
}
