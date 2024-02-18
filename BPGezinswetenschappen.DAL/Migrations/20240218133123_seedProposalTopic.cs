using Microsoft.EntityFrameworkCore.Migrations;

namespace BPGezinswetenschappen.DAL.Migrations
{
    public partial class seedProposalTopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add ProposalTopic entries
            migrationBuilder.Sql(@"
                INSERT INTO ProposalTopic (ProposalsProposalId, TopicsTopicId)
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
            // Remove ProposalTopic entries
            migrationBuilder.Sql(@"
                DELETE FROM ProposalTopic WHERE (ProposalsProposalId, TopicsTopicId) IN ((1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6));
            ");
        }
    }
}
