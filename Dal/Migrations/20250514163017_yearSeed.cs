using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class yearSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Years",
                column: "Label",
                values: new object[]
                {
                    "2021-2022",
                    "2022-2023",
                    "2023-2024",
                    "2024-2025",
                    "2025-2026",
                    "2026-2027",
                    "2027-2028"
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Years",
                keyColumn: "Label",
                keyValues: new object[]
                {
                                "2021-2022",
                                "2022-2023",
                                "2023-2024",
                                "2024-2025",
                                "2025-2026",
                                "2026-2027",
                                "2027-2028"
                });
        }
    }
}
