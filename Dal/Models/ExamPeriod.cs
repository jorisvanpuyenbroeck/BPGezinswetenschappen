using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{ 
    public class ExamPeriod
    {
        public int ExamPeriodId { get; set; }
        public string Name { get; set; }

        public int YearId { get; set; }
        public Year Year { get; set; }

        public ICollection<DAL.Models.PresentationDay>? PresentationDays { get; set; } = new List<DAL.Models.PresentationDay>();
    }
}