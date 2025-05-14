using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class examPeriodSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ExamPeriods",
                columns: new[] { "Name", "YearId" },
                values: new object[,]
                {
                    { "EP1", 1 }, { "EP2", 1 }, { "EP3", 1 },
                    { "EP1", 2 }, { "EP2", 2 }, { "EP3", 2 },
                    { "EP1", 3 }, { "EP2", 3 }, { "EP3", 3 },
                    { "EP1", 4 }, { "EP2", 4 }, { "EP3", 4 },
                    { "EP1", 5 }, { "EP2", 5 }, { "EP3", 5 },
                    { "EP1", 6 }, { "EP2", 6 }, { "EP3", 6 },
                    { "EP1", 7 }, { "EP2", 7 }, { "EP3", 7 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            for (int yearId = 1; yearId <= 7; yearId++)
            {
                migrationBuilder.DeleteData(
                    table: "ExamPeriods",
                    keyColumns: new[] { "Name", "YearId" },
                    keyValues: new object[] { "EP1", yearId });

                migrationBuilder.DeleteData(
                    table: "ExamPeriods",
                    keyColumns: new[] { "Name", "YearId" },
                    keyValues: new object[] { "EP2", yearId });

                migrationBuilder.DeleteData(
                    table: "ExamPeriods",
                    keyColumns: new[] { "Name", "YearId" },
                    keyValues: new object[] { "EP3", yearId });
            }
        }
    }
}
