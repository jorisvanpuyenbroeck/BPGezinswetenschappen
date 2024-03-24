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


        public BPContext()
        {
        }

        public BPContext(DbContextOptions<BPContext> options) : base(options)
        { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Topic>().ToTable("Topics");
            modelBuilder.Entity<Organisation>().ToTable("Organisations");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Proposal>().ToTable("Proposals");

            modelBuilder.Entity<Project>().ToTable("Projects")
                .HasOne(p => p.Student)
                .WithMany(u => u.StudentProjects)
                .HasForeignKey(p => p.StudentId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Project>().ToTable("Projects")
                .HasOne(p => p.Coach)
                .WithMany(u => u.CoachProjects)
                .HasForeignKey(p => p.CoachId)
                .OnDelete(DeleteBehavior.NoAction);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // optionsBuilder.UseSqlServer("Server=tcp:bpzinswetenschappen.database.windows.net,1433;Initial Catalog=BPGezinswetenschappenAPI;Persist Security Info=False;User ID=joris;Password=Angular1234!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=AngularDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
            }
        }

    }
}
