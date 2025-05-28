using System.ComponentModel.DataAnnotations;
using BPGezinswetenschappen.API.Dtos.Topic;

namespace BPGezinswetenschappen.API.Dtos.Proposal
{
    public class ProposalReadDto
    {
        public int ProposalId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Origin { get; set; }
        public ICollection<TopicReadDto>? Topics { get; set; }
    }
}
