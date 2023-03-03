using BPGezinswetenschappen.DAL.Models;
using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration.Json;


namespace BPGezinswetenschappen.DAL.Data
{
    public class BPContext : DbContext
    {
        public BPContext()
        {
        }

        public BPContext(DbContextOptions<BPContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<ProjectIdea> ProjectIdeas { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<UserTopic> UserTopics { get; set; }
        public DbSet<ProjectTopic> ProjectTopics { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();
            modelBuilder.Entity<ProjectIdea>().ToTable("ProjectIdea");
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Student)
                .WithMany(u => u.StudentProjects)
                .HasForeignKey(p => p.StudentId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Coach)
                .WithMany(u => u.CoachProjects)
                .HasForeignKey(p => p.CoachId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Organisation>().ToTable("Organisation");
            modelBuilder.Entity<Topic>().ToTable("Topic");
            modelBuilder.Entity<UserTopic>().ToTable("CoachTopic");
            modelBuilder.Entity<ProjectTopic>().ToTable("ProjectTopic");

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=BPGezinswetenschappenAPI;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

    }
}
