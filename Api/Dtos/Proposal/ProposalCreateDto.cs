using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BPGezinswetenschappen.API.Dtos.Proposal
{
    public class ProposalCreateDto
    {
        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public string Origin { get; set; }
        
        // Associated topic IDs
        public List<int> TopicIds { get; set; } = new List<int>();
    }
}
