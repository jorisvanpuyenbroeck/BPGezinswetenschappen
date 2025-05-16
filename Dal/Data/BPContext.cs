using BPGezinswetenschappen.DAL.Models;
using DAL.Models;
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
        public DbSet<Year> Years { get; set; }
        public DbSet<ClassRoom> Classrooms { get; set; }
        public DbSet<ExamPeriod> ExamPeriods { get; set; }
        public DbSet<PresentationDay> PresentationDays { get; set; }
        public DbSet<Presentation> Presentations { get; set; }
        public DbSet<Slot> Slots { get; set; }
        public DbSet<PresentationSlot> PresentationSlots { get; set; }
        public DbSet<UserSlot> UserSlots { get; set; }



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
            modelBuilder.Entity<Year>().ToTable("Years");
            modelBuilder.Entity<ExamPeriod>().ToTable("ExamPeriods");
            modelBuilder.Entity<PresentationDay>().ToTable("PresentationDays");
            modelBuilder.Entity<Presentation>().ToTable("Presentations");
            modelBuilder.Entity<ClassRoom>().ToTable("ClassRoom");

            modelBuilder.Entity<Slot>().ToTable("Slots")
                .HasOne(s => s.Classroom)
                .WithMany(c => c.Slots)
                .HasForeignKey(s => s.ClassRoomId);

            modelBuilder.Entity<Slot>().ToTable("Slots")
                .HasOne(s => s.PresentationDay)
                .WithMany(pd => pd.Slots)
                .HasForeignKey(s => s.PresentationDayId);

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

            // Relationships for Presentation
            modelBuilder.Entity<Presentation>()
                .HasOne(p => p.Student)
                .WithMany(u => u.StudentPresentations)
                .HasForeignKey(p => p.StudentId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Presentation>()
                .HasOne(p => p.Coach)
                .WithMany(u => u.CoachPresentations)
                .HasForeignKey(p => p.CoachId)
                .OnDelete(DeleteBehavior.NoAction);

            // userslots and presentationslots

            modelBuilder.Entity<PresentationSlot>().ToTable("PresentationSlots")
                    .HasKey(ps => new { ps.PresentationId, ps.SlotId });

            modelBuilder.Entity<PresentationSlot>()
                .HasOne(ps => ps.Presentation)
                .WithMany(p => p.Slots)
                .HasForeignKey(ps => ps.PresentationId);

            modelBuilder.Entity<PresentationSlot>()
                .HasOne(ps => ps.Slot)
                .WithMany(s => s.Presentations)
                .HasForeignKey(ps => ps.SlotId);

            modelBuilder.Entity<UserSlot>().ToTable("UserSlots")
                    .HasKey(us => new { us.UserId, us.SlotId });

            modelBuilder.Entity<UserSlot>()
                .HasOne(us => us.User)
                .WithMany(u => u.AvailableSlots)
                .HasForeignKey(usa => usa.UserId);

            modelBuilder.Entity<UserSlot>()
                .HasOne(us => us.Slot)
                .WithMany(s => s.Availabilities)
                .HasForeignKey(us => us.SlotId);

            modelBuilder.Entity<UserSlot>()
                .Property(us => us.Role)
                .IsRequired();

            //date time conversion


            modelBuilder.Entity<Slot>()
                .Property(s => s.StartTime)
                .HasConversion(
                    v => v.ToTimeSpan(),
                    v => TimeOnly.FromTimeSpan(v));

            modelBuilder.Entity<Slot>()
                .Property(s => s.EndTime)
                .HasConversion(
                    v => v.ToTimeSpan(),
                    v => TimeOnly.FromTimeSpan(v));


        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // optionsBuilder.UseSqlServer("Server=tcp:bpzinswetenschappen.database.windows.net,1433;Initial Catalog=BPGezinswetenschappenAPI;Persist Security Info=False;User ID=joris;Password=Angular1234!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GWBPDEV;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
            }
        }

    }
}
