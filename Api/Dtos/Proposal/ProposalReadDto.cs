using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Proposal
{
    public class ProposalReadDto
    {
        public int ProposalId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Origin { get; set; }
    }
}
