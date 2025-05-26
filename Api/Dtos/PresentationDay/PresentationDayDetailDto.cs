using System;
using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.ExamPeriod;
using BPGezinswetenschappen.API.Dtos.Slot;

namespace BPGezinswetenschappen.API.Dtos.PresentationDay
{
    public class PresentationDayDetailDto
    {
        public int PresentationDayId { get; set; }
        public DateTime Date { get; set; }
        
        public int ExamPeriodId { get; set; }
        public ExamPeriodReadDto ExamPeriod { get; set; }
        
        public ICollection<SlotReadDto> Slots { get; set; }
    }
}
