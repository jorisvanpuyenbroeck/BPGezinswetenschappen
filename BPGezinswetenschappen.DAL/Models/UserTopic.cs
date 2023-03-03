namespace BPGezinswetenschappen.DAL.Models
{
    public class UserTopic
    {
        public int Id { get; set; }

        // foreign keys
        public int TopicId { get; set; }
        public int UserId { get; set; }


        // navigation property

        public Topic? Topic { get; set; }
        public User? User { get; set; }

    }
}
