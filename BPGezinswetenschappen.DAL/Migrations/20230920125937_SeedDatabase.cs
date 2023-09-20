using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SeedDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Make (Name) VALUES ('Audi')");
            migrationBuilder.Sql("INSERT INTO Make (Name) VALUES ('BMW')");
            migrationBuilder.Sql("INSERT INTO Make (Name) VALUES ('Mercedes')");

            migrationBuilder.Sql("INSERT INTO Model (Name, MakeId) VALUES ('A4', (SELECT Id FROM Make WHERE Name = 'Audi'))");
            migrationBuilder.Sql("INSERT INTO Model (Name, MakeId) VALUES ('A5', (SELECT Id FROM Make WHERE Name = 'Audi'))");
            migrationBuilder.Sql("INSERT INTO Model (Name, MakeId) VALUES ('A6', (SELECT Id FROM Make WHERE Name = 'Audi'))");
            migrationBuilder.Sql("INSERT INTO Model (Name, MakeId) VALUES ('X1', (SELECT Id FROM Make WHERE Name = 'BMW'))");
            migrationBuilder.Sql("INSERT INTO Model (Name, MakeId) VALUES ('X2', (SELECT Id FROM Make WHERE Name = 'BMW'))");
            migrationBuilder.Sql("INSERT INTO Model (Name, MakeId) VALUES ('X3', (SELECT Id FROM Make WHERE Name = 'BMW'))");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Make WHERE Name IN ('Audi', 'BMW', 'Mercedes')");

        }
    }
}
