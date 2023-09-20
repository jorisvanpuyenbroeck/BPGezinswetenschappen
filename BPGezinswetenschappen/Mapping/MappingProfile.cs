using AutoMapper;

namespace BPGezinswetenschappen.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap
            // CreateMap<Make, MakeResource>();
            // CreateMap<Model, ModelResource>();
            // API Resource to Domain
            // CreateMap<MakeResource, Make>();
            // CreateMap<ModelResource, Model>();
        }
    }
}
