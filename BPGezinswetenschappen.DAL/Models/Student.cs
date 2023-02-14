using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BPGezinswetenschappen.DAL.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? StudentNumber { get; set; }
        public string? ProgramType { get; set; }
        public string? PracticeType { get; set; }


        public ICollection<Project>? Projects { get; set; }
    }
}
