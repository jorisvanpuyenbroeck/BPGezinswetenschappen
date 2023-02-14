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

        public DbSet<Student> Students { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<CoachTopic> CoachTopics { get; set; }
        public DbSet<ProjectTopic> ProjectTopics { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().ToTable("Student");
            modelBuilder.Entity<Project>().ToTable("Project");
            modelBuilder.Entity<Organisation>().ToTable("Organisation");
            modelBuilder.Entity<Coach>().ToTable("Coach");
            modelBuilder.Entity<Topic>().ToTable("Topic");
            modelBuilder.Entity<CoachTopic>().ToTable("CoachTopic");
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
