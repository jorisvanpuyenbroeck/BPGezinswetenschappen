using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Year
    {
        public int YearId { get; set; }
        public string Label { get; set; }
        public ICollection<ExamPeriod> ExamPeriods { get; set; } = new List<ExamPeriod>();
    }
}
