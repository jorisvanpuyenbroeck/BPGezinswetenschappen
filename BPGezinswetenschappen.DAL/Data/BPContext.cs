using BPGezinswetenschappen.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace BPGezinswetenschappen.DAL.Data
{
    public class BPContext : DbContext
    {

        public DbSet<Topic> Topics { get; set; }
        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Proposal> Proposals { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }


        public BPContext()
        {
        }

        public BPContext(DbContextOptions<BPContext> options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Topic>().ToTable("Topic");
            modelBuilder.Entity<Organisation>().ToTable("Organisation");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Proposal>().ToTable("Proposal");
            modelBuilder.Entity<Make>().ToTable("Make");
            modelBuilder.Entity<Model>().ToTable("Model");
            modelBuilder.Entity<Feature>().ToTable("Feature")
                .HasMany(f => f.Vehicles)
                .WithMany(v => v.Features)
                .UsingEntity(j => j.ToTable("Featurevehicle"));
            modelBuilder.Entity<Vehicle>().ToTable("Vehicle");

            modelBuilder.Entity<Project>().ToTable("Project")
                .HasOne(p => p.Student)
                .WithMany(u => u.StudentProjects)
                .HasForeignKey(p => p.StudentId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Project>().ToTable("Project")
                .HasOne(p => p.Coach)
                .WithMany(u => u.CoachProjects)
                .HasForeignKey(p => p.CoachId)
                .OnDelete(DeleteBehavior.NoAction);

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
