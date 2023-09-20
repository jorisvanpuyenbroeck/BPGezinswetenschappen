using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SeedFeatures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Feature (Name) VALUES ('Feature1')");
            migrationBuilder.Sql("INSERT INTO Feature (Name) VALUES ('Feature2')");
            migrationBuilder.Sql("INSERT INTO Feature (Name) VALUES ('Feature3')");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Feature WHERE Name IN ('Feature1', 'Feature2', 'Feature3')");

        }
    }
}
