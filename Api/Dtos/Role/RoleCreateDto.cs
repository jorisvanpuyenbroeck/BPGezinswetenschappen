using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Role
{
    public class RoleCreateDto
    {
        [Required]
        public string Name { get; set; }
    }
}
