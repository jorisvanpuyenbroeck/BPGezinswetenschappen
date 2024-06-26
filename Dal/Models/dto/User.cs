﻿using System.ComponentModel.DataAnnotations.Schema;

namespace BPGezinswetenschappen.DAL.Models.dto
{
    public class UserResource
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Password { get; set; }
        [NotMapped]
        public string? Token { get; set; }
        public string? Email { get; set; }
        public string? ProgramType { get; set; }
        public string? UserLevel { get; set; }
        public string? Expertise { get; set; }
        
    }
}
