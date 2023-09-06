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
                new Topic { Name = "Jeugdhulp", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                new Topic { Name = "Opvoedingsondersteuning", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                new Topic { Name = "Mantelzorg", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                new Topic { Name = "Armoede", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                new Topic { Name = "Diversiteit", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                new Topic { Name = "Migratie", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
                new Topic { Name = "School", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }
                );

            context.SaveChanges();

            //Add organisations
            context.AddRange(
                new Organisation { Name = "Levenslust", Address = "Huart Hamoirlaan, 136", PostalCode = "1030", City = "Schaarbeek", Email = "info@odisee.be", Url = "http://www.odisee.be", Contact = "Joris Van Puyenbroeck" },
                new Organisation { Name = "Huis Van Het Kind Brussel", Address = "Huart Hamoirlaan, 136", PostalCode = "1030", City = "Schaarbeek", Email = "info@odisee.be", Url = "http://www.odisee.be", Contact = "Joris Van Puyenbroeck" },
                new Organisation { Name = "Netwerk Tegen Armoede", Address = "Huart Hamoirlaan, 136", PostalCode = "1030", City = "Schaarbeek", Email = "info@odisee.be", Url = "http://www.odisee.be", Contact = "Joris Van Puyenbroeck" }
                );

            context.SaveChanges();

            //Add users
            context.AddRange(
                new User
                {
                    UserName = "r0000001",
                    FirstName = "Willem",
                    LastName = "Helsen",
                    UserLevel = "student",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    ProgramType = "Traject A",
                },
                new User
                {
                    UserName = "r0000002",
                    FirstName = "Jonas",
                    LastName = "Quintiens",
                    UserLevel = "student",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    ProgramType = "Traject B",
                }, new User
                {
                    UserName = "u0000001",
                    FirstName = "Wilfried",
                    LastName = "Meulenbergs",
                    UserLevel = "coach",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    Expertise = "Jeugdhulp"
                },
                new User
                {

                    UserName = "u0000002",
                    FirstName = "Jan",
                    LastName = "Waeben",
                    UserLevel = "coach",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    Expertise = "Digitale communciatie"

                },
                new User
                {

                    UserName = "u0000003",
                    FirstName = "Kristien",
                    LastName = "Nys",
                    UserLevel = "coach",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    Expertise = "Armoede"

                },
                new User
                {

                    UserName = "u0032661",
                    FirstName = "Joris",
                    LastName = "Van Puyenbroeck",
                    UserLevel = "admin",
                    Password = "1234",
                    Email = "joris.vanpuyenbroeck@odisee.be",
                    Expertise = "Handicap"
                });

            context.SaveChanges();


            //Proposals

            context.AddRange(
                new Proposal
                {
                    Title = "Gezinsgerichte begeleiding in de jeugdhulp",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Origin = "student"
                },
                new Proposal
                {
                    Title = "Opvoedingsondersteuning bij mensen in armoede",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Origin = "docent"
                },
                new Proposal
                {
                    Title = "Telewerk opties voor mantelzorgers",
                    Description = "Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    Origin = "werkveld"
                });

            context.SaveChanges();

            // User Topics

            context.AddRange(
                 new UserTopic()
                 {
                     UserId = 1,
                     TopicId = 1,
                 },
                 new UserTopic()
                 {
                     UserId = 1,
                     TopicId = 2,
                 },
                 new UserTopic()
                 {
                     UserId = 1,
                     TopicId = 3,
                 },
                 new UserTopic()
                 {
                     UserId = 2,
                     TopicId = 4,
                 },
                 new UserTopic()
                 {
                     UserId = 2,
                     TopicId = 5,
                 });

            context.SaveChanges();


            //Projects

            context.AddRange(
                new Project()
                {
                    CreatedAt = DateTime.Now.AddDays(-14),
                    UpdatedAt = DateTime.Now.AddDays(-7),
                    Stage = "In uitvoering",
                    Active = true,
                    Supported = true,
                    Reviewed = false,
                    Approved = false,
                    Feedback = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    UserId = 1,
                    OrganisationId = 1,
                    ProposalId = 1,
                },
                new Project()
                {
                    CreatedAt = DateTime.Now.AddDays(-7),
                    UpdatedAt = DateTime.Now.AddDays(-3),
                    Stage = "In uitvoering",
                    Active = true,
                    Supported = true,
                    Reviewed = false,
                    Approved = false,
                    Feedback = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    UserId = 2,
                    OrganisationId = 2,
                    ProposalId = 2,
                },
                new Project()
                {
                    CreatedAt = DateTime.Now.AddDays(-3),
                    UpdatedAt = DateTime.Now.AddDays(-1),
                    Stage = "In uitvoering",
                    Active = true,
                    Supported = true,
                    Reviewed = false,
                    Approved = false,
                    Feedback = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    UserId = 1,
                    OrganisationId = 3,
                    ProposalId = 3,
                });

            context.SaveChanges();

            // Project topics


            context.AddRange(
                new ProjectTopic()
                {
                    ProjectId = 1,
                    TopicId = 1,
                },
                new ProjectTopic()
                {
                    ProjectId = 1,
                    TopicId = 2,
                },
                new ProjectTopic()
                {
                    ProjectId = 2,
                    TopicId = 3,
                },
                new ProjectTopic()
                {
                    ProjectId = 2,
                    TopicId = 4,
                },
                new ProjectTopic()
                {
                    ProjectId = 3,
                    TopicId = 5,
                },
                new ProjectTopic()
                {
                    ProjectId = 3,
                    TopicId = 6,
                });


            context.SaveChanges();


            //User topics
            context.AddRange(
                new UserTopic()
                {
                    UserId = 1,
                    TopicId = 1,
                },
                new UserTopic()
                {
                    UserId = 1,
                    TopicId = 2,
                },
                new UserTopic()
                {
                    UserId = 1,
                    TopicId = 3,
                },
                new UserTopic()
                {
                    UserId = 2,
                    TopicId = 4,
                },
                new UserTopic()
                {
                    UserId = 2,
                    TopicId = 5,
                });

            context.SaveChanges();
        }
    }
}
