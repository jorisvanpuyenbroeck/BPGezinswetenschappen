using AutoMapper;
using BPGezinswetenschappen.API.Dtos;
using BPGezinswetenschappen.API.Dtos.Classroom;
using BPGezinswetenschappen.API.Dtos.ExamPeriod;
using BPGezinswetenschappen.API.Dtos.Organisation;
using BPGezinswetenschappen.API.Dtos.Presentation;
using BPGezinswetenschappen.API.Dtos.PresentationDay;
using BPGezinswetenschappen.API.Dtos.PresentationSlot;
using BPGezinswetenschappen.API.Dtos.Project;
using BPGezinswetenschappen.API.Dtos.Proposal;
using BPGezinswetenschappen.API.Dtos.Role;
using BPGezinswetenschappen.API.Dtos.Slot;
using BPGezinswetenschappen.API.Dtos.Topic;
using BPGezinswetenschappen.API.Dtos.User;
using BPGezinswetenschappen.API.Dtos.UserSlot;
using BPGezinswetenschappen.API.Dtos.Year;
using BPGezinswetenschappen.DAL.Models;
using DAL.Models;


namespace BPGezinswetenschappen.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<User, UserReadDto>();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<User, UserDetailDto>();            
            CreateMap<Topic, TopicReadDto>();
            CreateMap<TopicCreateDto, Topic>();
            CreateMap<TopicUpdateDto, Topic>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            
            // Proposal mappings
            CreateMap<Proposal, ProposalReadDto>()
                .ForMember(dest => dest.Topics, opt => opt.MapFrom(src => src.Topics));
            CreateMap<ProposalCreateDto, Proposal>();
            CreateMap<ProposalUpdateDto, Proposal>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            
            // Project mappings
            CreateMap<Project, ProjectReadDto>();
            CreateMap<ProjectCreateDto, Project>();
            CreateMap<ProjectUpdateDto, Project>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Project, ProjectDetailDto>();
            
            // Organisation mappings
            CreateMap<Organisation, OrganisationReadDto>();
            CreateMap<OrganisationCreateDto, Organisation>();
            CreateMap<OrganisationUpdateDto, Organisation>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            
            // Year mappings
            CreateMap<Year, YearReadDto>();
            CreateMap<YearCreateDto, Year>();
            CreateMap<YearUpdateDto, Year>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Year, YearDetailDto>();

            // ExamPeriod mappings
            CreateMap<ExamPeriod, ExamPeriodReadDto>();
            CreateMap<ExamPeriodCreateDto, ExamPeriod>();
            CreateMap<ExamPeriodUpdateDto, ExamPeriod>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<ExamPeriod, ExamPeriodDetailDto>();

            // PresentationDay mappings
            CreateMap<PresentationDay, PresentationDayReadDto>();
            CreateMap<PresentationDayCreateDto, PresentationDay>();
            CreateMap<PresentationDayUpdateDto, PresentationDay>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<PresentationDay, PresentationDayDetailDto>();

            // Classroom mappings
            CreateMap<Classroom, ClassroomReadDto>();
            CreateMap<ClassroomCreateDto, Classroom>();
            CreateMap<ClassroomUpdateDto, Classroom>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Classroom, ClassroomDetailDto>();

            // Slot mappings
            CreateMap<Slot, SlotReadDto>();
            CreateMap<SlotCreateDto, Slot>();
            CreateMap<SlotUpdateDto, Slot>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Slot, SlotDetailDto>();

            // Presentation mappings
            CreateMap<Presentation, PresentationReadDto>();
            CreateMap<PresentationCreateDto, Presentation>();
            CreateMap<PresentationUpdateDto, Presentation>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Presentation, PresentationDetailDto>();

            // PresentationSlot mappings
            CreateMap<PresentationSlot, PresentationSlotReadDto>();
            CreateMap<PresentationSlotCreateDto, PresentationSlot>();
            CreateMap<PresentationSlot, PresentationSlotDetailDto>();

            // Role mappings
            CreateMap<Role, RoleReadDto>();
            CreateMap<RoleCreateDto, Role>();
            CreateMap<RoleUpdateDto, Role>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<Role, RoleDetailDto>();

            // UserSlot mappings
            CreateMap<UserSlot, UserSlotReadDto>();
            CreateMap<UserSlotCreateDto, UserSlot>();
            CreateMap<UserSlotUpdateDto, UserSlot>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<UserSlot, UserSlotDetailDto>();
        }
    }
}
