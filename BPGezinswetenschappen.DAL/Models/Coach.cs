using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BPGezinswetenschappen.DAL.Models
{
    public class Coach
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? EmployeeId { get; set; }
        public string? Expertise { get; set; }

        // navigation property

        public ICollection<CoachTopic>? CoachTopics { get; set; }


    }
}
