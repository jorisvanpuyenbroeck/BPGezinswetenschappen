using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Topic
{
    public class TopicReadDto
    {
        public int TopicId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
