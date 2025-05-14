using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class classRoomSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ClassRoom",
                columns: new[] { "Name", "Level" },
                values: new object[,]
                {
                    { "Iris", "1" },
                    { "Lelie", "1" },
                    { "Roos", "1" },
                    { "Papaver", "1" },
                    { "Tulp", "1" },
                    { "Orchidee", "1" },
                    { "Fresia", "2" },
                    { "Krokus", "2" },
                    { "Mimosa", "2" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ClassRoom",
                keyColumn: "Name",
                keyValues: new object[]
                {
                    "Iris",
                    "Lelie",
                    "Roos",
                    "Papaver",
                    "Tulp",
                    "Orchidee",
                    "Fresia",
                    "Krokus",
                    "Mimosa"
                });
        }
    }
}
