using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Organisation
{
    public class OrganisationReadDto
    {
        public int OrganisationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
        public string Contact { get; set; }
    }
}
