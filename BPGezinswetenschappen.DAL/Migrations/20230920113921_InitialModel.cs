using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitialModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "Organisation",
            //    columns: table => new
            //    {
            //        OrganisationId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        City = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Contact = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Organisation", x => x.OrganisationId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Proposal",
            //    columns: table => new
            //    {
            //        ProposalId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Origin = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Proposal", x => x.ProposalId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Topic",
            //    columns: table => new
            //    {
            //        TopicId = table.Column<int>(type: "int", nullable: false),
            //        Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Topic", x => x.TopicId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "User",
            //    columns: table => new
            //    {
            //        UserId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        ProgramType = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        UserLevel = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Expertise = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_User", x => x.UserId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ProposalTopic",
            //    columns: table => new
            //    {
            //        ProposalsProposalId = table.Column<int>(type: "int", nullable: false),
            //        TopicsTopicId = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ProposalTopic", x => new { x.ProposalsProposalId, x.TopicsTopicId });
            //        table.ForeignKey(
            //            name: "FK_ProposalTopic_Proposal_ProposalsProposalId",
            //            column: x => x.ProposalsProposalId,
            //            principalTable: "Proposal",
            //            principalColumn: "ProposalId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_ProposalTopic_Topic_TopicsTopicId",
            //            column: x => x.TopicsTopicId,
            //            principalTable: "Topic",
            //            principalColumn: "TopicId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Project",
            //    columns: table => new
            //    {
            //        ProjectId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        Stage = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Active = table.Column<bool>(type: "bit", nullable: true),
            //        Supported = table.Column<bool>(type: "bit", nullable: true),
            //        Reviewed = table.Column<bool>(type: "bit", nullable: true),
            //        Approved = table.Column<bool>(type: "bit", nullable: true),
            //        Feedback = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        StudentId = table.Column<int>(type: "int", nullable: false),
            //        CoachId = table.Column<int>(type: "int", nullable: false),
            //        OrganisationId = table.Column<int>(type: "int", nullable: false),
            //        ProposalId = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Project", x => x.ProjectId);
            //        table.ForeignKey(
            //            name: "FK_Project_Organisation_OrganisationId",
            //            column: x => x.OrganisationId,
            //            principalTable: "Organisation",
            //            principalColumn: "OrganisationId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Project_Proposal_ProposalId",
            //            column: x => x.ProposalId,
            //            principalTable: "Proposal",
            //            principalColumn: "ProposalId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Project_User_CoachId",
            //            column: x => x.CoachId,
            //            principalTable: "User",
            //            principalColumn: "UserId");
            //        table.ForeignKey(
            //            name: "FK_Project_User_StudentId",
            //            column: x => x.StudentId,
            //            principalTable: "User",
            //            principalColumn: "UserId");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "TopicUser",
            //    columns: table => new
            //    {
            //        TopicsTopicId = table.Column<int>(type: "int", nullable: false),
            //        UsersUserId = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_TopicUser", x => new { x.TopicsTopicId, x.UsersUserId });
            //        table.ForeignKey(
            //            name: "FK_TopicUser_Topic_TopicsTopicId",
            //            column: x => x.TopicsTopicId,
            //            principalTable: "Topic",
            //            principalColumn: "TopicId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_TopicUser_User_UsersUserId",
            //            column: x => x.UsersUserId,
            //            principalTable: "User",
            //            principalColumn: "UserId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ProjectTopic",
            //    columns: table => new
            //    {
            //        ProjectsProjectId = table.Column<int>(type: "int", nullable: false),
            //        TopicsTopicId = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ProjectTopic", x => new { x.ProjectsProjectId, x.TopicsTopicId });
            //        table.ForeignKey(
            //            name: "FK_ProjectTopic_Project_ProjectsProjectId",
            //            column: x => x.ProjectsProjectId,
            //            principalTable: "Project",
            //            principalColumn: "ProjectId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_ProjectTopic_Topic_TopicsTopicId",
            //            column: x => x.TopicsTopicId,
            //            principalTable: "Topic",
            //            principalColumn: "TopicId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Project_CoachId",
            //    table: "Project",
            //    column: "CoachId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Project_OrganisationId",
            //    table: "Project",
            //    column: "OrganisationId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Project_ProposalId",
            //    table: "Project",
            //    column: "ProposalId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Project_StudentId",
            //    table: "Project",
            //    column: "StudentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProjectTopic_TopicsTopicId",
            //    table: "ProjectTopic",
            //    column: "TopicsTopicId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProposalTopic_TopicsTopicId",
            //    table: "ProposalTopic",
            //    column: "TopicsTopicId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_TopicUser_UsersUserId",
            //    table: "TopicUser",
            //    column: "UsersUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectTopic");

            migrationBuilder.DropTable(
                name: "ProposalTopic");

            migrationBuilder.DropTable(
                name: "TopicUser");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Topic");

            migrationBuilder.DropTable(
                name: "Organisation");

            migrationBuilder.DropTable(
                name: "Proposal");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
