using BPGezinswetenschappen.API.Dtos.Year;

namespace BPGezinswetenschappen.API.Dtos.ExamPeriod
{
    public class ExamPeriodReadDto
    {
        public int ExamPeriodId { get; set; }
        public string Name { get; set; }
        public YearReadDto Year { get; set; }

    }
}
