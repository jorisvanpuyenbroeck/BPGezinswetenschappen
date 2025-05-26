using System;
using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.PresentationDay
{
    public class PresentationDayUpdateDto
    {
        public DateTime? Date { get; set; }
        public int? ExamPeriodId { get; set; }
    }
}
