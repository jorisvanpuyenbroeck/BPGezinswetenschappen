namespace BPGezinswetenschappen.DAL.Models
{
    public class ProposalTopic
    {
        public int ProposalTopicId { get; set; }


        public int TopicId { get; set; }
        public Topic? Topic { get; set; }
        public int ProposalId { get; set; }
        public Proposal? Proposal { get; set; }




    }
}
