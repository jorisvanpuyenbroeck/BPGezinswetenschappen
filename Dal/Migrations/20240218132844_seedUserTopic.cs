using Microsoft.EntityFrameworkCore.Migrations;

namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class seedUserTopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add TopicUser entries
            migrationBuilder.Sql(@"
                INSERT INTO TopicUser (TopicsTopicId, UsersUserId)
                VALUES (1, 1),
                       (2, 1),
                       (3, 2),
                       (4, 2),
                       (1, 3),
                       (2, 3),
                       (3, 4),
                       (6, 4),
                       (5, 5),
                       (7, 5),
                       (2, 6),
                       (7, 6),
                       (3, 7),
                       (6, 7);
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove TopicUser entries
            migrationBuilder.Sql(@"
                DELETE FROM TopicUser WHERE (TopicsTopicId, UsersUserId) IN ((1, 1), (2, 1), (3, 2), (4, 2), (1, 3), (2, 3), (3, 4), (6, 4), (5, 5), (7, 5), (2, 6), (7, 6), (3, 7), (6, 7));
            ");
        }
    }
}

