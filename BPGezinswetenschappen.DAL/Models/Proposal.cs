namespace BPGezinswetenschappen.DAL.Models
{
    public class Proposal
    {
        // [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProposalId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Origin { get; set; }


        // navigation property

        public ICollection<Project>? Projects { get; set; }
        public ICollection<Topic>? Topics { get; set; }


    }
}
