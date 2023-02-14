namespace BPGezinswetenschappen.DAL.Models
{
    public class Project
    {
        public int Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Origin { get; set; }
        public string? Stage { get; set; }
        public Boolean? Active { get; set; }
        public Boolean? Supported { get; set; }
        public Boolean? Reviewed { get; set; }
        public Boolean? Approved { get; set; }
        public string? Feedback { get; set; }


        // foreign keys

        public int StudentId { get; set; }
        public int OrganisationId { get; set; }
        public int CoachId { get; set; }
        public Student Student { get; set; }
        public Organisation Organisation { get; set; }
        public Coach Coach { get; set; }

        // navigation property

        public ICollection<ProjectTopic>? ProjectTopics { get; set; }



    }
}
