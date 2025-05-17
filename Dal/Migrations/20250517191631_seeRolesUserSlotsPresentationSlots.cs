using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class seeRolesUserSlotsPresentationSlots : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Seed default roles
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleId", "Name" },
                values: new object[,]
                {
                    { 1, "student" },
                    { 2, "coach" },
                    { 3, "expert" },
                    { 4, "admin" },
                    { 5, "head" },
                    { 6, "secretary" },
                    { 7, "replacement" },
                    { 8, "mentor" },
                    { 9, "advisor" },
                    { 10, "public" }
                });


            // Map existing string UserLevel → RoleId
            migrationBuilder.Sql(@"
                UPDATE Users
                SET RoleId = CASE UserLevel
                    WHEN 'student' THEN 1
                    WHEN 'coach' THEN 2
                    WHEN 'expert' THEN 3
                    ELSE 1 END
            ");

            // Seed UserSlotAvailability
            migrationBuilder.InsertData(
                table: "UserSlots",
                columns: new[] { "UserId", "SlotId", "RoleId" },
                values: new object[,]
                {
                    // Students: users 1–3 in slots 1–3
                    { 1, 1, 1 },
                    { 2, 2, 1 },
                    { 3, 3, 1 },
                    { 4, 1, 2 },
                    { 5, 2, 2 },
                    { 6, 3, 2 },
                    { 7, 1, 3 },
                    { 8, 2, 3 },
                    { 9, 3, 3 },

                });

            // Seed PresentationSlot
            migrationBuilder.InsertData(
                table: "PresentationSlots",
                columns: new[] { "PresentationId", "SlotId" },
                values: new object[,]
                {
                    { 3, 1 },
                    { 2, 2 },
                    { 2, 3 },
                    { 3, 3 }
                });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Delete PresentationSlots
            migrationBuilder.DeleteData(
                table: "PresentationSlots",
                keyColumns: new[] { "PresentationId", "SlotId" },
                keyValues: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 2, 3 },
                    { 3, 3 }
                });

            // Delete UserSlotAvailabilities
            migrationBuilder.DeleteData(
                table: "UserSlots",
                keyColumns: new[] { "UserId", "SlotId" },
                keyValues: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 },
                    { 4, 1 },
                    { 5, 2 },
                    { 6, 3 },
                    { 7, 1 },
                    { 8, 2 },
                    { 9, 3 }
                });

            // Optional: Clear RoleId in Users (rollback of Role mapping)
            migrationBuilder.Sql(@"
                UPDATE Users
                SET RoleId = NULL
            ");

            // Delete Roles
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "RoleId",
                keyValues: new object[]
                {
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
                });
        }

    }
}
