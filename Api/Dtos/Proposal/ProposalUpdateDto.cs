using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BPGezinswetenschappen.API.Dtos.Proposal
{
    public class ProposalUpdateDto
    {
        [StringLength(100, MinimumLength = 5)]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public string Origin { get; set; }
        
        // Associated topic IDs to update
        public List<int> TopicIds { get; set; } = new List<int>();
    }
}
