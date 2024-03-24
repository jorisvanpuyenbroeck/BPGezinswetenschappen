using System.ComponentModel.DataAnnotations.Schema;

namespace BPGezinswetenschappen.DAL.Models.dto
{
    public class ProposalResource
    {
        public int ProposalId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Origin { get; set; }

    }
}
