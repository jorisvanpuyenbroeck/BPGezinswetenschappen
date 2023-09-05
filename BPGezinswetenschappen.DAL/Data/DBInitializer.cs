using BPGezinswetenschappen.DAL.Models;

namespace BPGezinswetenschappen.DAL.Data
{
    public class DBInitializer
    {
        public static void Initialize(BPContext context)
        {
         context.Database.EnsureDeleted();
         context.Database.EnsureCreated();

            // Look for any users
            if (context.Users.Any())
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

            context.SaveChanges();


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



            //Proposals

            Proposal idea1 = new Proposal()
            {
                Title = "Gezinsgerichte begeleiding in de jeugdhulp"
            };
            Proposal idea2 = new Proposal()
            {
                Title = "Opvoedingsondersteuning bij mensen in armoede"
            };
            Proposal idea3 = new Proposal()
            {
                Title = "Telewerk opties voor mantelzorgers"
            };

            context.Add(idea1);
            context.Add(idea2);
            context.Add(idea3);


            context.SaveChanges();

            // User Topics

            UserTopic userTopic = new UserTopic()
            {
                UserId = 1,
                TopicId = 1,
            };

            context.Add(userTopic);


            //Projects

           Project project = new Project()
           {
               UserId = 1,
               OrganisationId = 1,
               ProposalId = 1,
           };
            context.Add(project);

            // Project topics

            context.SaveChanges();


            ProjectTopic projectTopic = new ProjectTopic()
            {
                ProjectId = 1,
                TopicId = 1,
            };

            context.Add(projectTopic);


            context.SaveChanges();
        }
    }
}
