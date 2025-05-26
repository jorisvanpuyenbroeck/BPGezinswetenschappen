using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Organisation
{
    public class OrganisationCreateDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        public string Address { get; set; }
        
        [StringLength(20)]
        public string PostalCode { get; set; }
        
        public string City { get; set; }
        
        [Phone]
        public string Phone { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }
        
        [Url]
        public string Url { get; set; }
        
        public string Contact { get; set; }
    }
}
