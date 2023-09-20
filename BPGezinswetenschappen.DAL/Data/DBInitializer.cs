using BPGezinswetenschappen.DAL.Models;

namespace BPGezinswetenschappen.DAL.Data
{
    public class DBInitializer
    {
        public static void Initialize(BPContext context)
        {
            // context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Look for any users
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            //Add topics

            var topic1 = new Topic { TopicId = 1, Name = "Jeugdhulp", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." };
            var topic2 = new Topic { TopicId = 2, Name = "Opvoedingsondersteuning", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." };
            var topic3 = new Topic { TopicId = 3, Name = "Mantelzorg", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." };
            var topic4 = new Topic { TopicId = 4, Name = "Armoede", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." };
            var topic5 = new Topic { TopicId = 5, Name = "Diversiteit", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." };
            var topic6 = new Topic { TopicId = 6, Name = "Migratie", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." };
            var topic7 = new Topic { TopicId = 7, Name = "School", Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." };

            context.AddRange(topic1, topic2, topic3, topic4, topic5, topic6, topic7);
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
                    Topics = new List<Topic> { topic1, topic2 }
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
                    Topics = new List<Topic> { topic3, topic4 }
                },
                new User
                {
                    UserName = "r0000003",
                    FirstName = "Maarten",
                    LastName = "Willems",
                    UserLevel = "student",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    ProgramType = "Traject C",
                    Topics = new List<Topic> { topic1, topic2 }
                },
                new User
                {
                    UserName = "u0000001",
                    FirstName = "Wilfried",
                    LastName = "Meulenbergs",
                    UserLevel = "coach",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    Expertise = "Jeugdhulp",
                    Topics = new List<Topic> { topic3, topic6 }
                },
                new User
                {

                    UserName = "u0000002",
                    FirstName = "Jan",
                    LastName = "Waeben",
                    UserLevel = "coach",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    Expertise = "Digitale communciatie",
                    Topics = new List<Topic> { topic5, topic7 }

                },
                new User
                {

                    UserName = "u0000003",
                    FirstName = "Kristien",
                    LastName = "Nys",
                    UserLevel = "coach",
                    Password = "1234",
                    Email = "john.doe@odisee.be",
                    Expertise = "Armoede",
                    Topics = new List<Topic> { topic2, topic7 }

                },
                new User
                {

                    UserName = "u0032661",
                    FirstName = "Joris",
                    LastName = "Van Puyenbroeck",
                    UserLevel = "admin",
                    Password = "1234",
                    Email = "joris.vanpuyenbroeck@odisee.be",
                    Expertise = "Handicap",
                    Topics = new List<Topic> { topic3, topic6 }
                });

            context.SaveChanges();


            //Proposals

            context.AddRange(
                new Proposal
                {
                    Title = "Gezinsgerichte begeleiding in de jeugdhulp",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Origin = "student",
                    Topics = new List<Topic> { topic1, topic2 }
                },
                new Proposal
                {
                    Title = "Opvoedingsondersteuning bij mensen in armoede",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Origin = "docent",
                    Topics = new List<Topic> { topic3, topic4 }
                },
                new Proposal
                {
                    Title = "Telewerk opties voor mantelzorgers",
                    Description = "Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    Origin = "werkveld",
                    Topics = new List<Topic> { topic5, topic6 }
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
                    StudentId = 1,
                    CoachId = 1,
                    OrganisationId = 1,
                    ProposalId = 1,
                    Topics = new List<Topic> { topic1, topic2 }
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
                    StudentId = 2,
                    CoachId = 2,
                    OrganisationId = 2,
                    ProposalId = 2,
                    Topics = new List<Topic> { topic3, topic4 }
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
                    StudentId = 3,
                    CoachId = 3,
                    OrganisationId = 3,
                    ProposalId = 3,
                    Topics = new List<Topic> { topic5, topic6 }
                });

            context.SaveChanges();



        }
    }
}
