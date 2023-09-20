namespace BPGezinswetenschappen.API.Controllers.Resources
{

    public class VehicleResource
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        public string Name { get; set; }
        public ContactResource Contact { get; set; }
        public List<int> Features { get; } = new();


        public VehicleResource()
        {
            Features = new List<int>();
        }

    }
}
