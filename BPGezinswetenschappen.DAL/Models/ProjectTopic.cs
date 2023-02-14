using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BPGezinswetenschappen.DAL.Models
{
    public class ProjectTopic
    {
        public int Id { get; set; }
        public int TopicId { get; set; }
        public int ProjectId { get; set; }

        public Topic? Topic { get; set; }
        public Project? Project { get; set; }
    }
}
