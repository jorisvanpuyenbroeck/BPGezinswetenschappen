using BPGezinswetenschappen.DAL.Models;

namespace BPGezinswetenschappen.DAL.Data
{
    public class DBInitializer
    {
        public static void Initialize(BPContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Look for any products.
            //if (context.Users.Any())
            //{
            //    return;   // DB has been seeded
            //}

            //Add topics
            context.AddRange(
                new Topic { Name = "Jeugdhulp" },
                new Topic { Name = "Opvoedingsondersteuning" },
                new Topic { Name = "Mantelzorg" },
                new Topic { Name = "Armoede" },
                new Topic { Name = "Diversiteit" },
                new Topic { Name = "Migratie" },
                new Topic { Name = "School" }
                );

            //Add organisations

            context.AddRange(
                new Organisation { Name = "Levenslust" },
                new Organisation { Name = "Huis Van Het Kind Brussel" },
                new Organisation { Name = "Netwerk Tegen Armoede" }
                );

            //Add users
            User studentWillem = new User()
            {
                UserName = "r0000001",
                FirstName = "Willem",
                LastName = "Helsen",
                UserLevel = "student",
                Password = "1234",
            };

            User studentJonas = new User()
            {
                UserName = "r0000002",
                FirstName = "Jonas",
                LastName = "Quintiens",
                UserLevel = "student",
                Password = "1234",
            };

            context.Add(studentJonas);
            context.Add(studentWillem);

            //Add coaches
            User coachWilfried = new User()
            {
                UserName = "u0000001",
                FirstName = "Wilfried",
                LastName = "Meulenbergs",
                UserLevel = "coach",
                Password = "1234",
            };

            User coachJan = new User()
            {

                UserName = "u0000002",
                FirstName = "Jan",
                LastName = "Waeben",
                UserLevel = "coach",
                Password = "1234",
            };
            User coachKristien = new User()
            {

                UserName = "u0000003",
                FirstName = "Kristien",
                LastName = "Nys",
                UserLevel = "coach",
                Password = "1234",
            };
            context.Add(coachJan);
            context.Add(coachKristien);
            context.Add(coachWilfried);

            // add admin

            User adminJoris = new User()
            {

                UserName = "u0032661",
                FirstName = "Joris",
                LastName = "Van Puyenbroeck",
                UserLevel = "admin",
                Password = "1234",
            };
            context.Add(adminJoris);

            context.SaveChanges();



            //ProjectIdeas

            ProjectIdea idea = new ProjectIdea()
            {
                Title = "Gezinsgerichte begeleiding in de jeugdhulp"
            };
            ProjectIdea idea2 = new ProjectIdea()
            {
                Title = "Opvoedingsondersteuning bij mensen in armoede"
            };
            ProjectIdea idea3 = new ProjectIdea()
            {
                Title = "Telewerk opties voor mantelzorgers"
            };

            context.Add(idea);
            context.Add(idea2);
            context.Add(idea3);


            //ProjectApplications

            Project project = new Project()
            {
                CreatedAt = DateTime.Now,
                StudentId = 1,
                CoachId = 4,
                OrganisationId = 1,
                ProjectIdeaId = 1,
            };

            Project project2 = new Project()
            {
                CreatedAt = DateTime.Now.AddDays(-7),
                StudentId = 2,
                CoachId = 5,
                OrganisationId = 2,
                ProjectIdeaId = 2,

            };

            Project project3 = new Project()
            {
                CreatedAt = DateTime.Now.AddDays(-14),
                StudentId = 3,
                CoachId = 6,
                OrganisationId = 3,
                ProjectIdeaId = 3,
            };

            context.Add(project);
            context.Add(project2);
            context.Add(project3);

            ////ProductOrders
            //ProductOrder po = new ProductOrder()
            //{
            //    OrderId = 1,
            //    ProductId = 1,
            //    Quantity = 5
            //};

            //ProductOrder po2 = new ProductOrder()
            //{
            //    OrderId = 2,
            //    ProductId = 2,
            //    Quantity = 2
            //};

            //ProductOrder po3 = new ProductOrder()
            //{
            //    OrderId = 1,
            //    ProductId = 2,
            //    Quantity = 10
            //};

            //context.Add(po);
            //context.Add(po2);
            //context.Add(po3);

            //context.AddRange(
            //    new User { UserName = "micclo", Password = "test", CustomerId = 1 },
            //    new User { UserName = "jos", Password = "test", CustomerId = 2 },
            //    new User { UserName = "joris2", Password = "test", CustomerId = 3 }
            //);

            context.SaveChanges();
        }
    }
}
