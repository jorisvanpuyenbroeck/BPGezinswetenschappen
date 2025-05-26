using System;
using System.Collections.Generic;
using BPGezinswetenschappen.API.Dtos.Organisation;
using BPGezinswetenschappen.API.Dtos.Proposal;
using BPGezinswetenschappen.API.Dtos.Topic;
using BPGezinswetenschappen.API.Dtos.User;

namespace BPGezinswetenschappen.API.Dtos.Project
{
    public class ProjectReadDto
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
        
        // Only include IDs for basic read operations
        public int? StudentId { get; set; }
        public int? CoachId { get; set; }
        public int? OrganisationId { get; set; }
        public int? ProposalId { get; set; }
        public List<int> TopicIds { get; set; }
    }
}
