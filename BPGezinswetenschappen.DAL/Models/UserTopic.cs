namespace BPGezinswetenschappen.DAL.Models
{
    public class UserTopic
    {
        public int UserTopicId { get; set; }


        public int UserId { get; set; }
        public User? User { get; set; }
        public int TopicId { get; set; }
        public Topic? Topic { get; set; }


    }
}
