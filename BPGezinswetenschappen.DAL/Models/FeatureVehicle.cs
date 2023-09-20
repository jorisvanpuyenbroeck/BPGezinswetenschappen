namespace BPGezinswetenschappen.DAL.Models
{
    public class FeatureVehicle
    {
        public int FeatureId { get; set; }
        public int VehicleId { get; set; }
        public Feature Feature { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}
