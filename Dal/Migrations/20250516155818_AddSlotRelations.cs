using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddSlotRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Presentations_Slots_SlotId",
                table: "Presentations");

            migrationBuilder.DropIndex(
                name: "IX_Presentations_SlotId",
                table: "Presentations");

            migrationBuilder.DropColumn(
                name: "SlotId",
                table: "Presentations");

            migrationBuilder.CreateTable(
                name: "PresentationSlots",
                columns: table => new
                {
                    PresentationId = table.Column<int>(type: "int", nullable: false),
                    SlotId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentationSlots", x => new { x.PresentationId, x.SlotId });
                    table.ForeignKey(
                        name: "FK_PresentationSlots_Presentations_PresentationId",
                        column: x => x.PresentationId,
                        principalTable: "Presentations",
                        principalColumn: "PresentationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PresentationSlots_Slots_SlotId",
                        column: x => x.SlotId,
                        principalTable: "Slots",
                        principalColumn: "SlotId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSlots",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SlotId = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSlots", x => new { x.UserId, x.SlotId });
                    table.ForeignKey(
                        name: "FK_UserSlots_Slots_SlotId",
                        column: x => x.SlotId,
                        principalTable: "Slots",
                        principalColumn: "SlotId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSlots_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PresentationSlots_SlotId",
                table: "PresentationSlots",
                column: "SlotId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSlots_SlotId",
                table: "UserSlots",
                column: "SlotId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PresentationSlots");

            migrationBuilder.DropTable(
                name: "UserSlots");

            migrationBuilder.AddColumn<int>(
                name: "SlotId",
                table: "Presentations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Presentations_SlotId",
                table: "Presentations",
                column: "SlotId",
                unique: true,
                filter: "[SlotId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Presentations_Slots_SlotId",
                table: "Presentations",
                column: "SlotId",
                principalTable: "Slots",
                principalColumn: "SlotId");
        }
    }
}
