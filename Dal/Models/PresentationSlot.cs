using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class PresentationSlot
    {
        public int PresentationId { get; set; }
        public Presentation Presentation { get; set; } = null!;

        public int SlotId { get; set; }
        public Slot Slot { get; set; } = null!;
    }
}
