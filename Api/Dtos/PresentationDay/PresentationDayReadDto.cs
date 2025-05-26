using System;

namespace BPGezinswetenschappen.API.Dtos.PresentationDay
{
    public class PresentationDayReadDto
    {
        public int PresentationDayId { get; set; }
        public DateTime Date { get; set; }
        public int ExamPeriodId { get; set; }
    }
}
