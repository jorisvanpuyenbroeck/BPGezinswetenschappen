using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddUserOrganisationRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganisationId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_OrganisationId",
                table: "Users",
                column: "OrganisationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Organisations_OrganisationId",
                table: "Users",
                column: "OrganisationId",
                principalTable: "Organisations",
                principalColumn: "OrganisationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Organisations_OrganisationId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_OrganisationId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OrganisationId",
                table: "Users");
        }
    }
}
