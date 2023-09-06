using System.ComponentModel.DataAnnotations.Schema;

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

        [ForeignKey("StudentId")]
        public int? StudentId { get; set; }
        public User Student { get; set; }
        [ForeignKey("CoachId")]
        public int? CoachId { get; set; }
        public User Coach { get; set; }
        [ForeignKey("OrganisationId")]
        public int OrganisationId { get; set; }
        public Organisation? Organisation { get; set; }
        [ForeignKey("ProposalId")]
        public int ProposalId { get; set; }
        public Proposal? Proposal { get; set; }


        public ICollection<ProjectTopic>? ProjectTopics { get; set; }



    }
}
