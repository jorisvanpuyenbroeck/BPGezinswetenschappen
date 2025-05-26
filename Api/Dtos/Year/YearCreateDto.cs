using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Year
{
    public class YearCreateDto
    {
        [Required]
        public string Label { get; set; }
    }
}
