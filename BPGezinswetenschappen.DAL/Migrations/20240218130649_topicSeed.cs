using Microsoft.EntityFrameworkCore.Migrations;

namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class topicSeed : Migration
    {


        protected override void Up(MigrationBuilder migrationBuilder)
        {

            var mockData = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Name", "Description" },
                values: new object[,]
                {
                    { "Jeugdhulp", mockData },
                    { "Opvoedingsondersteuning", mockData },
                    { "Mantelzorg", mockData},
                    { "Armoede", mockData },
                    { "Diversiteit", mockData },
                    { "Migratie",mockData },
                    { "School", mockData }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Name",
                keyValues: new object[]
                {
                    "Jeugdhulp",
                    "Opvoedingsondersteuning",
                    "Mantelzorg",
                    "Armoede",
                    "Diversiteit",
                    "Migratie",
                    "School"
                });
        }
    }
}
