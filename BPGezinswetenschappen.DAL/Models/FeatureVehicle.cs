namespace BPGezinswetenschappen.DAL.Models
{
    public class FeatureVehicle
    {
        public int VehicleId { get; set; }
        public int FeatureId { get; set; }
        public Vehicle Vehicle { get; set; }
        public Feature Feature { get; set; }
    }
}
