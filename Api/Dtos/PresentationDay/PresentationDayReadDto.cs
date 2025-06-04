using System;
using BPGezinswetenschappen.API.Dtos.ExamPeriod;

namespace BPGezinswetenschappen.API.Dtos.PresentationDay
{
    public class PresentationDayReadDto
    {
        public int PresentationDayId { get; set; }
        public DateTime Date { get; set; }
        public ExamPeriodReadDto ExamPeriod { get; set; }
    }
}
