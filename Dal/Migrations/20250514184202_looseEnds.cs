using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class looseEnds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert 3 expert users
            migrationBuilder.Sql(@"
            INSERT INTO Users (UserName, GivenName, FamilyName, UserLevel, Password, Email, ProgramType)
            VALUES ('e0000001', 'Sofie', 'Van Damme', 'expert', '1234', 'expert1@odisee.be', 'N/A'),
                   ('e0000002', 'Bruno', 'De Wilde', 'expert', '1234', 'expert2@odisee.be', 'N/A'),
                   ('e0000003', 'Leen', 'Jacobs', 'expert', '1234', 'expert3@odisee.be', 'N/A');
        ");

            // Drop foreign key and index before dropping the column
            migrationBuilder.DropForeignKey(
                name: "FK_Presentations_PresentationDays_PresentationDayId",
                table: "Presentations");

            migrationBuilder.DropIndex(
                name: "IX_Presentations_PresentationDayId",
                table: "Presentations");

            migrationBuilder.DropColumn(
                name: "PresentationDayId",
                table: "Presentations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Re-add the column
            migrationBuilder.AddColumn<int>(
                name: "PresentationDayId",
                table: "Presentations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // Recreate index
            migrationBuilder.CreateIndex(
                name: "IX_Presentations_PresentationDayId",
                table: "Presentations",
                column: "PresentationDayId");

            // Recreate foreign key
            migrationBuilder.AddForeignKey(
                name: "FK_Presentations_PresentationDays_PresentationDayId",
                table: "Presentations",
                column: "PresentationDayId",
                principalTable: "PresentationDays",
                principalColumn: "PresentationDayId",
                onDelete: ReferentialAction.Cascade);

            // Delete the expert users
            migrationBuilder.Sql(@"
            DELETE FROM Users
            WHERE UserName IN ('e0000001', 'e0000002', 'e0000003');
        ");
        }
    }
 }
