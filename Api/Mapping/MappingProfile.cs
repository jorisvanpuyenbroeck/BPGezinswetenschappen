using AutoMapper;
using BPGezinswetenschappen.DAL.Models;
using BPGezinswetenschappen.DAL.Models.dto;

namespace BPGezinswetenschappen.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Proposal, ProposalResource>();
            CreateMap<Topic, TopicResource>();
            CreateMap<Project, ProjectResource>();
            CreateMap<User, UserResource>();
        }
    }
}
