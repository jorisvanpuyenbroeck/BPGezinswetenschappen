using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BPGezinswetenschappen.DAL.Models;

namespace DAL.Models
{ 
    public class Slot
    {
        public int SlotId { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }

        public int? PresentationDayId { get; set; }
        public PresentationDay? PresentationDay { get; set; }

        public int? ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }

        public ICollection<PresentationSlot> Presentations { get; set; } = new List<PresentationSlot>();
        public ICollection<UserSlot> Availabilities { get; set; } = new List<UserSlot>();

    }


}


