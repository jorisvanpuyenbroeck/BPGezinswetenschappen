namespace BPGezinswetenschappen.API.Dtos.Presentation
{
    public class PresentationReadDto
    {
        public int PresentationId { get; set; }
        public int StudentId { get; set; }
        public int CoachId { get; set; }
        public int? ExpertId { get; set; }
    }
}
