using System.ComponentModel.DataAnnotations.Schema;

namespace BPGezinswetenschappen.DAL.Models.dto
{
    public class ProjectResource
    {
        public int ProjectId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? Stage { get; set; }
        public Boolean? Active { get; set; }
        public Boolean? Supported { get; set; }
        public Boolean? Reviewed { get; set; }
        public Boolean? Approved { get; set; }
        public string? Feedback { get; set; }
        
    }
}
