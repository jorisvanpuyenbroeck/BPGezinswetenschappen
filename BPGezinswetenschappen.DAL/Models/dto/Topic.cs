using System.ComponentModel.DataAnnotations.Schema;

namespace BPGezinswetenschappen.DAL.Models.dto
{
    public class TopicResource
    {
        public int TopicId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
    }
}
