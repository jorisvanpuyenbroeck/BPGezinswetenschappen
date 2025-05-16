using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class PresentationDay
    {
        public int PresentationDayId { get; set; }
        public DateTime Date { get; set; }

        public int ExamPeriodId { get; set; }
        public ExamPeriod ExamPeriod { get; set; } = null!;

        public ICollection<Slot> Slots { get; set; } = new List<Slot>();
    }
}
