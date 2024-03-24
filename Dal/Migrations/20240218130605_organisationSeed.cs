using Microsoft.EntityFrameworkCore.Migrations;


namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class organisationSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add organisations
            migrationBuilder.Sql(@"
                INSERT INTO Organisations (Name, Address, PostalCode, City, Email, Url, Contact)
                VALUES ('Levenslust', 'Huart Hamoirlaan, 136', '1030', 'Schaarbeek', 'info@odisee.be', 'http://www.odisee.be', 'Joris Van Puyenbroeck'),
                       ('Huis Van Het Kind Brussel', 'Huart Hamoirlaan, 136', '1030', 'Schaarbeek', 'info@odisee.be', 'http://www.odisee.be', 'Joris Van Puyenbroeck'),
                       ('Netwerk Tegen Armoede', 'Huart Hamoirlaan, 136', '1030', 'Schaarbeek', 'info@odisee.be', 'http://www.odisee.be', 'Joris Van Puyenbroeck');
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove organisations
            migrationBuilder.Sql(@"
                DELETE FROM Organisations WHERE Name IN ('Levenslust', 'Huis Van Het Kind Brussel', 'Netwerk Tegen Armoede');
            ");
        }
    }
}
