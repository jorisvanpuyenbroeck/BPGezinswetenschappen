using Microsoft.EntityFrameworkCore.Migrations;

namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class userSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add users
            migrationBuilder.Sql(@"
                INSERT INTO Users (UserName, FirstName, LastName, UserLevel, Password, Email, ProgramType)
                VALUES ('r0000001', 'Willem', 'Helsen', 'student', '1234', 'john.doe@odisee.be', 'Traject A'),
                       ('r0000002', 'Jonas', 'Quintiens', 'student', '1234', 'john.doe@odisee.be', 'Traject B'),
                       ('r0000003', 'Maarten', 'Willems', 'student', '1234', 'john.doe@odisee.be', 'Traject C');
            ");

            migrationBuilder.Sql(@"
                INSERT INTO Users (UserName, FirstName, LastName, UserLevel, Password, Email, Expertise)
                VALUES ('u0000001', 'Wilfried', 'Meulenbergs', 'coach', '1234', 'john.doe@odisee.be', 'Jeugdhulp'),
                       ('u0000002', 'Jan', 'Waeben', 'coach', '1234', 'john.doe@odisee.be', 'Digitale communciatie'),
                       ('u0000003', 'Kristien', 'Nys', 'coach', '1234', 'john.doe@odisee.be', 'Armoede'),
                       ('u0032661', 'Joris', 'Van Puyenbroeck', 'admin', '1234', 'joris.vanpuyenbroeck@odisee.be', 'Handicap');
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove users
            migrationBuilder.Sql(@"
                DELETE FROM Users WHERE UserName IN ('r0000001', 'r0000002', 'r0000003', 'u0000001', 'u0000002', 'u0000003', 'u0032661');
            ");
        }
    }
}
