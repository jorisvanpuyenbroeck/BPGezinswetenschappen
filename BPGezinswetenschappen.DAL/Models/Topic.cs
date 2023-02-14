using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BPGezinswetenschappen.DAL.Models
{
    public class Topic
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // navigation property
        public ICollection<ProjectTopic>? ProjectTopics { get; set; }
        public ICollection<CoachTopic>? CoachTopics { get; set; }


    }
}
