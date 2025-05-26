using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BPGezinswetenschappen.API.Dtos.Project
{
    public class ProjectUpdateDto
    {
        [StringLength(100, MinimumLength = 5)]
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public string Stage { get; set; }
        
        public bool? Active { get; set; }
        
        public bool? Supported { get; set; }
        
        public bool? Reviewed { get; set; }
        
        public bool? Approved { get; set; }
        
        public string Feedback { get; set; }
        
        public int? StudentId { get; set; }
        
        public int? CoachId { get; set; }
        
        public int? OrganisationId { get; set; }
        
        public int? ProposalId { get; set; }
        
        public List<int> TopicIds { get; set; }
    }
}
