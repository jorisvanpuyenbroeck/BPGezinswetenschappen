using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class presentationDays : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PresentationDays",
                columns: new[] { "Date", "ExamPeriodId" },
                values: new object[,]
                {
                    // Year 1
                    { new DateTime(2022, 1, 27), 1 }, { new DateTime(2022, 1, 28), 1 },
                    { new DateTime(2022, 6, 28), 2 }, { new DateTime(2022, 6, 29), 2 },
                    { new DateTime(2022, 9, 5),  3 }, { new DateTime(2022, 9, 6),  3 },

                    // Year 2
                    { new DateTime(2023, 1, 26), 4 }, { new DateTime(2023, 1, 27), 4 },
                    { new DateTime(2023, 6, 27), 5 }, { new DateTime(2023, 6, 28), 5 },
                    { new DateTime(2023, 9, 4),  6 }, { new DateTime(2023, 9, 5),  6 },

                    // Year 3
                    { new DateTime(2024, 1, 25), 7 }, { new DateTime(2024, 1, 26), 7 },
                    { new DateTime(2024, 6, 25), 8 }, { new DateTime(2024, 6, 26), 8 },
                    { new DateTime(2024, 9, 2),  9 }, { new DateTime(2024, 9, 3),  9 },

                    // Year 4
                    { new DateTime(2025, 1, 30), 10 }, { new DateTime(2025, 1, 31), 10 },
                    { new DateTime(2025, 6, 25), 11 }, { new DateTime(2025, 6, 26), 11 },
                    { new DateTime(2025, 9, 2),  12 }, { new DateTime(2025, 9, 3),  12 },

                    // Year 5
                    { new DateTime(2026, 1, 29), 13 }, { new DateTime(2026, 1, 30), 13 },
                    { new DateTime(2026, 6, 24), 14 }, { new DateTime(2026, 6, 25), 14 },
                    { new DateTime(2026, 9, 1),  15 }, { new DateTime(2026, 9, 2),  15 },

                    // Year 6
                    { new DateTime(2027, 1, 28), 16 }, { new DateTime(2027, 1, 29), 16 },
                    { new DateTime(2027, 6, 23), 17 }, { new DateTime(2027, 6, 24), 17 },
                    { new DateTime(2027, 9, 1),  18 }, { new DateTime(2027, 9, 2),  18 },

                    // Year 7
                    { new DateTime(2028, 1, 27), 19 }, { new DateTime(2028, 1, 28), 19 },
                    { new DateTime(2028, 6, 22), 20 }, { new DateTime(2028, 6, 23), 20 },
                    { new DateTime(2028, 9, 4),  21 }, { new DateTime(2028, 9, 5),  21 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            for (int examPeriodId = 1; examPeriodId <= 21; examPeriodId++)
            {
                migrationBuilder.DeleteData(
                    table: "PresentationDays",
                    keyColumn: "ExamPeriodId",
                    keyValue: examPeriodId
                );
            }
        }
    }
}
