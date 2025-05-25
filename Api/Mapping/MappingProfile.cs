using AutoMapper;
using BPGezinswetenschappen.API.Dtos;
using BPGezinswetenschappen.DAL.Models;


namespace BPGezinswetenschappen.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Proposal, ProposalDto>();
            CreateMap<Topic, TopicDto>().ReverseMap(); 
            CreateMap<Project, ProjectDto>();
            CreateMap<User, UserDto>();
        }
    }
}
