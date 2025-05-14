using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ClassRoom
    {
        public int ClassroomId { get; set; }
        public string Name { get; set; }
        public string? Level { get; set; }

        public ICollection<Slot> Slots { get; set; } = new List<Slot>();
    }
}
