namespace BPGezinswetenschappen.DAL.Models
{
    public class Proposal
    {
        public int ProposalId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Origin { get; set; }


        // navigation property

        public ICollection<Project>? Projects { get; set; }
        public ICollection<ProposalTopic>? ProposalTopics { get; set; }


    }
}
