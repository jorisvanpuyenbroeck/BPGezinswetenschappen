using AutoMapper;
using BPGezinswetenschappen.API.Controllers.Resources;
using BPGezinswetenschappen.DAL.Models;

namespace BPGezinswetenschappen.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            // API Resource to Domain
            // CreateMap<MakeResource, Make>();
            // CreateMap<ModelResource, Model>();
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.MapFrom(vr => vr.Features.Select(id => new FeatureVehicle { FeatureId = id })));
        }
    }
}
