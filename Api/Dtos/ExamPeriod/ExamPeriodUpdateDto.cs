using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.ExamPeriod
{
    public class ExamPeriodUpdateDto
    {
        public string Name { get; set; }
        public int? YearId { get; set; }
    }
}
