namespace BPGezinswetenschappen.DAL.Models
{
    public class ProjectIdea
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Origin { get; set; }


        // navigation property

        public ICollection<Project>? Projects { get; set; }
        public ICollection<ProjectTopic>? ProjectTopics { get; set; }


    }
}
