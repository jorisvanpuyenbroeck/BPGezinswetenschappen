using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class presentationSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO Presentations (StudentId, CoachId, ExpertId, SlotId)
                VALUES 
                    (1, 4, 7, 1),
                    (2, 5, 8, 2),
                    (3, 6, 9, 3);
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DELETE FROM Presentations
                WHERE SlotId IN (1, 2, 3);
            ");
        }
    }
}
