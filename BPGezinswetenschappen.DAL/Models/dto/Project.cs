namespace BPGezinswetenschappen.DAL.Models.dto
{
    public class ProjectResource
    {
        public int ProjectId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Stage { get; set; }
        public Boolean? Active { get; set; }
        public Boolean? Supported { get; set; }
        public Boolean? Reviewed { get; set; }
        public Boolean? Approved { get; set; }
        public string? Feedback { get; set; }
        public int? StudentId { get; set; }
        public int? CoachId { get; set; }
        public int? OrganisationId { get; set; }
        public int? ProposalId { get; set; }
        public int[]? TopicIds { get; set; }

    }
}
