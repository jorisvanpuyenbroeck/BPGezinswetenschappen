using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.ExamPeriod;

namespace BPGezinswetenschappen.API.Dtos.Year
{
    public class YearDetailDto
    {
        public int YearId { get; set; }
        public string Label { get; set; }
        public ICollection<ExamPeriodReadDto> ExamPeriods { get; set; }
    }
}
