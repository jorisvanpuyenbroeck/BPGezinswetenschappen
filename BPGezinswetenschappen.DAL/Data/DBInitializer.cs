using BPGezinswetenschappen.DAL.Models;

namespace BPGezinswetenschappen.DAL.Data
{
    public class DBInitializer
    {
        public static void Initialize(BPContext context)
        {
            //context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Look for any products.
            if (context.Students.Any())
            {
                return;   // DB has been seeded
            }

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

            //Add customers
            Student studentWillem = new Student()
            {
                FirstName = "Willem",
                LastName = "Helsen",
            };

            Student studentJonas = new Student()
            {
                FirstName = "Jonas",
                LastName = "Quintiens",
            };
            Student studentJoris = new Student()
            {
                FirstName = "Joris",
                LastName = "Van Puyenbroeck",
            };
            context.Add(studentJoris);
            context.Add(studentJonas);
            context.Add(studentWillem);


            //Add coaches
            Coach coachWilfried = new Coach()
            {
                FirstName = "Wilfried",
                LastName = "Meulenbergs",
            };

            Coach coachJan = new Coach()
            {
                FirstName = "Jan",
                LastName = "Waeben",
            };
            Coach coachKristien = new Coach()
            {
                FirstName = "Kristien",
                LastName = "Nys",
            };
            context.Add(coachJan);
            context.Add(coachKristien);
            context.Add(coachWilfried);

            context.SaveChanges();

            //Projects
            Project project = new Project()
            {
                CreatedAt = DateTime.Now,
                StudentId = 1,
                CoachId = 1,
                OrganisationId = 1,
                Title = "Gezinsgerichte begeleiding in de jeugdhulp"
            };

            Project project2 = new Project()
            {
                CreatedAt = DateTime.Now.AddDays(-7),
                StudentId = 2,
                CoachId = 2,
                OrganisationId = 2,
                Title = "Opvoedingsondersteuning bij mensen in armoede"
            };

            Project project3 = new Project()
            {
                CreatedAt = DateTime.Now.AddDays(-14),
                StudentId = 3,
                CoachId = 3,
                OrganisationId = 3,
                Title = "Telewerk opties voor mantelzorgers"
            };

            context.Add(project);
            context.Add(project2);

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
