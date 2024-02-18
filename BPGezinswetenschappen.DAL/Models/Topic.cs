namespace BPGezinswetenschappen.DAL.Models
{
    public class Topic
    {

        // [DatabaseGenerated(DatabaseGeneratedOption.None)]

        public int TopicId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        // navigation property
        public ICollection<Proposal>? Proposals { get; set; }
        public ICollection<Project>? Projects { get; set; }
        public ICollection<User>? Users { get; set; }


    }
}
