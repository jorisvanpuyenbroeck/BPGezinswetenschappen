using Microsoft.EntityFrameworkCore.Migrations;

namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class projectSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add projects
            migrationBuilder.Sql(@"
                INSERT INTO Projects (Title, Description, CreatedAt, UpdatedAt, Stage, Active, Supported, Reviewed, Approved, Feedback, StudentId, CoachId, OrganisationId, ProposalId)
                VALUES ('My favourite dishes', 'Lorem...', DATEADD(day, -14, GETDATE()), DATEADD(day, -7, GETDATE()), 'In uitvoering', 1, 1, 0, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 1, 1, 1),
                       ('My favourite mobile apps', 'Lorem...', DATEADD(day, -7, GETDATE()), DATEADD(day, -3, GETDATE()), 'In uitvoering', 1, 1, 0, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 2, 2, 2),
                       ('Thinking about 4 years at TM', 'Lorem...', DATEADD(day, -3, GETDATE()), DATEADD(day, -1, GETDATE()), 'In uitvoering', 1, 1, 0, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 3, 3, 3, 3);
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove projects
            migrationBuilder.Sql(@"
                DELETE FROM Projects WHERE StudentId IN (1, 2, 3) AND CoachId IN (1, 2, 3) AND OrganisationId IN (1, 2, 3) AND ProposalId IN (1, 2, 3);
            ");
        }
    }
}
