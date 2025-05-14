using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class slotSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var slots = new object[42 * 12, 4]; // 42 presentation days × 12 slots/day
            int index = 0;
            int classroomCount = 9;

            for (int dayId = 1; dayId <= 42; dayId++)
            {
                var startTime = new DateTime(2025, 1, 1, 9, 0, 0); // date is arbitrary here
                int slotCount = 0;
                int classroomCycle = 0;

                while (slotCount < 12)
                {
                    // Skip lunch break: 12:30 to 13:30
                    if (startTime.Hour == 12 && startTime.Minute == 30)
                    {
                        startTime = startTime.AddHours(1); // Skip to 13:30
                    }

                    var endTime = startTime.AddMinutes(30);

                    slots[index, 0] = startTime;
                    slots[index, 1] = endTime;
                    slots[index, 2] = dayId;
                    slots[index, 3] = (classroomCycle % classroomCount) + 1;

                    startTime = endTime;
                    slotCount++;
                    classroomCycle++;
                    index++;
                }
            }

            migrationBuilder.InsertData(
                table: "Slots",
                columns: new[] { "StartTime", "EndTime", "PresentationDayId", "ClassRoomId" },
                values: slots
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            for (int dayId = 1; dayId <= 42; dayId++)
            {
                migrationBuilder.DeleteData(
                    table: "Slots",
                    keyColumn: "PresentationDayId",
                    keyValue: dayId
                );
            }
        }
    }
}
