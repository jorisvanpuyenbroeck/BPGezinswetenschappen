using Microsoft.EntityFrameworkCore.Migrations;

namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class seedProjectTopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add TopicProject entries
            migrationBuilder.Sql(@"
                INSERT INTO ProjectTopic (ProjectsProjectId, TopicsTopicId)
                VALUES (1, 1),
                       (1, 2),
                       (2, 3),
                       (2, 4),
                       (3, 5),
                       (3, 6);
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove TopicProject entries
            migrationBuilder.Sql(@"
                DELETE FROM ProjectTopic WHERE (ProjectsProjectId, TopicsTopicId) IN ((1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6));
            ");
        }
    }
}
