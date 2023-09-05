namespace BPGezinswetenschappen.DAL.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Stage { get; set; }
        public Boolean? Active { get; set; }
        public Boolean? Supported { get; set; }
        public Boolean? Reviewed { get; set; }
        public Boolean? Approved { get; set; }
        public string? Feedback { get; set; }


        public int UserId { get; set; }
        public User? User { get; set; }
        public int OrganisationId { get; set; }
        public Organisation? Organisation { get; set; }
        public int ProposalId { get; set; }
        public Proposal? Proposal { get; set; }


        public ICollection<ProjectTopic>? ProjectTopics { get; set; }



    }
}
