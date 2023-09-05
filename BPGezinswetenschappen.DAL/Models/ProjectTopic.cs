namespace BPGezinswetenschappen.DAL.Models
{
    public class ProjectTopic
    {
        public int ProjectTopicId { get; set; }


        public int TopicId { get; set; }
        public Topic? Topic { get; set; }
        public int ProjectId { get; set; }
        public Project? Project { get; set; }




    }
}
