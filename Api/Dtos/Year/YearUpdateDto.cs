using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Year
{
    public class YearUpdateDto
    {
        [Required]
        public string Label { get; set; }
    }
}
