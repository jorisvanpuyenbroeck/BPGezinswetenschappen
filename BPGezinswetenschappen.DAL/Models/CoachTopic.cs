using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BPGezinswetenschappen.DAL.Models
{
    public class CoachTopic
    {
        public int Id { get; set; }
        public int TopicId { get; set; }
        public int CoachId { get; set; }

        public Topic? Topic { get; set; }
        public Coach? Coach { get; set; }

    }
}
