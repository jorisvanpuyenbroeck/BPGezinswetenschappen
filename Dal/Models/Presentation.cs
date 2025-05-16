using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BPGezinswetenschappen.DAL.Models;

namespace DAL.Models
{
    public class Presentation
    {
        public int PresentationId { get; set; }
        public int StudentId { get; set; }
        public User Student { get; set; } = null!;

        public int CoachId { get; set; }
        public User Coach { get; set; } = null!;

        public int? ExpertId { get; set; }
        public User? Expert { get; set; } = null!;

        public ICollection<PresentationSlot> Slots { get; set; } = new List<PresentationSlot>();

    }
}
