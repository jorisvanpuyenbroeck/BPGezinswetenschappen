using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class updateUserswithOrganisations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Assign OrganisationId to users 1-10
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 1 WHERE UserId = 1");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 2 WHERE UserId = 2");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 3 WHERE UserId = 3");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 1 WHERE UserId = 4");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 2 WHERE UserId = 5");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 3 WHERE UserId = 6");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 1 WHERE UserId = 7");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 2 WHERE UserId = 8");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 3 WHERE UserId = 9");
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = 1 WHERE UserId = 10");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Users SET OrganisationId = NULL WHERE UserId BETWEEN 1 AND 10");

        }
    }
}
