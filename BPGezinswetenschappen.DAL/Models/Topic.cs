namespace BPGezinswetenschappen.DAL.Models
{
    public class Topic
    {
        public int TopicId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        // navigation property
        public ICollection<ProposalTopic>? ProposalTopics { get; set; }
        public ICollection<ProjectTopic>? ProjectTopics { get; set; }
        public ICollection<UserTopic>? UserTopics { get; set; }


    }
}
