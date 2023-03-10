namespace BPGezinswetenschappen.DAL.Models
{
    public class ProjectTopic
    {
        public int Id { get; set; }

        // foreign keys

        public int TopicId { get; set; }
        public int ProjectId { get; set; }

        // navigation property

        public Topic? Topic { get; set; }
        public ProjectIdea? ProjectIdea { get; set; }
    }
}
