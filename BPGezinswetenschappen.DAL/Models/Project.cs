namespace BPGezinswetenschappen.DAL.Models
{
    public class Project
    {
        public int Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Stage { get; set; }
        public Boolean? Active { get; set; }
        public Boolean? Supported { get; set; }
        public Boolean? Reviewed { get; set; }
        public Boolean? Approved { get; set; }
        public string? Feedback { get; set; }


        // foreign keys

        // [ForeignKey("Student")]
        public int? StudentId { get; set; }
        // [ForeignKey("Coach")]
        public int? CoachId { get; set; }
        public int OrganisationId { get; set; }
        public int ProjectIdeaId { get; set; }


        // navigation property


        public User Student { get; set; }
        public User Coach { get; set; }
        public Organisation Organisation { get; set; }
        public ProjectIdea ProjectIdea { get; set; }


    }
}
