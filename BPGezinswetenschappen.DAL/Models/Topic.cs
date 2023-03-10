namespace BPGezinswetenschappen.DAL.Models
{
    public class Topic
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        // navigation property
        public ICollection<ProjectTopic>? ProjectTopics { get; set; }
        public ICollection<UserTopic>? UserTopics { get; set; }


    }
}
