using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.PresentationDay;
using BPGezinswetenschappen.API.Dtos.Year;

namespace BPGezinswetenschappen.API.Dtos.ExamPeriod
{
    public class ExamPeriodDetailDto
    {
        public int ExamPeriodId { get; set; }
        public string Name { get; set; }
        
        public int YearId { get; set; }
        public YearReadDto Year { get; set; }
        
        public ICollection<PresentationDayReadDto> PresentationDays { get; set; }
    }
}
