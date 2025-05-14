using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{ 
    public class Slot
    {
        public int SlotId { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }

        public int? PresentationDayId { get; set; }
        public PresentationDay? PresentationDay { get; set; }

        public int? ClassRoomId { get; set; }
        public ClassRoom? Classroom { get; set; }
        public Presentation? Presentation { get; set; }
    }


}


