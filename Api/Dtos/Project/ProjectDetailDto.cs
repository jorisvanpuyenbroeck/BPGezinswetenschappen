using System;
using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.Organisation;
using BPGezinswetenschappen.API.Dtos.Proposal;
using BPGezinswetenschappen.API.Dtos.Topic;
using BPGezinswetenschappen.API.Dtos.User;

namespace BPGezinswetenschappen.API.Dtos.Project
{
    public class ProjectDetailDto
    {
        public int ProjectId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Stage { get; set; }
        public bool Active { get; set; }
        public bool Supported { get; set; }
        public bool Reviewed { get; set; }
        public bool Approved { get; set; }
        public string Feedback { get; set; }
        
        // Related entities
        public UserReadDto Student { get; set; }
        public UserReadDto Coach { get; set; }
        public OrganisationReadDto Organisation { get; set; }
        public ProposalReadDto Proposal { get; set; }
        public List<TopicReadDto> Topics { get; set; }
    }
}
