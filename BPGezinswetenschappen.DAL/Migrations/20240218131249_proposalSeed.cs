using Microsoft.EntityFrameworkCore.Migrations;

namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class proposalSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add proposals
            migrationBuilder.Sql(@"
                INSERT INTO Proposals (Title, Description, Origin)
                VALUES ('Gezinsgerichte begeleiding in de jeugdhulp', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'student'),
                       ('Opvoedingsondersteuning bij mensen in armoede', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'docent'),
                       ('Telewerk opties voor mantelzorgers', 'Lorem isum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'werkveld');
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove proposals
            migrationBuilder.Sql(@"
                DELETE FROM Proposals WHERE Title IN ('Gezinsgerichte begeleiding in de jeugdhulp', 'Opvoedingsondersteuning bij mensen in armoede', 'Telewerk opties voor mantelzorgers');
            ");
        }
    }
}
