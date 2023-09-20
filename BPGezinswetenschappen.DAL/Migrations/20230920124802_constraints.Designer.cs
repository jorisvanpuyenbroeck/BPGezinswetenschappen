﻿// <auto-generated />
using System;
using BPGezinswetenschappen.DAL.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    [DbContext(typeof(BPContext))]
    [Migration("20230920124802_constraints")]
    partial class constraints
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Make", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.ToTable("Make", (string)null);
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MakeId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("MakeId");

                    b.ToTable("Model", (string)null);
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Organisation", b =>
                {
                    b.Property<int>("OrganisationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrganisationId"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Contact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("OrganisationId");

                    b.ToTable("Organisation", (string)null);
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Project", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProjectId"));

                    b.Property<bool?>("Active")
                        .HasColumnType("bit");

                    b.Property<bool?>("Approved")
                        .HasColumnType("bit");

                    b.Property<int?>("CoachId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Feedback")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrganisationId")
                        .HasColumnType("int");

                    b.Property<int>("ProposalId")
                        .HasColumnType("int");

                    b.Property<bool?>("Reviewed")
                        .HasColumnType("bit");

                    b.Property<string>("Stage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StudentId")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<bool?>("Supported")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ProjectId");

                    b.HasIndex("CoachId");

                    b.HasIndex("OrganisationId");

                    b.HasIndex("ProposalId");

                    b.HasIndex("StudentId");

                    b.ToTable("Project", (string)null);
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Proposal", b =>
                {
                    b.Property<int>("ProposalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProposalId"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Origin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProposalId");

                    b.ToTable("Proposal", (string)null);
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Topic", b =>
                {
                    b.Property<int>("TopicId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TopicId");

                    b.ToTable("Topic", (string)null);
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Expertise")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProgramType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserLevel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("User", (string)null);
                });

            modelBuilder.Entity("ProjectTopic", b =>
                {
                    b.Property<int>("ProjectsProjectId")
                        .HasColumnType("int");

                    b.Property<int>("TopicsTopicId")
                        .HasColumnType("int");

                    b.HasKey("ProjectsProjectId", "TopicsTopicId");

                    b.HasIndex("TopicsTopicId");

                    b.ToTable("ProjectTopic");
                });

            modelBuilder.Entity("ProposalTopic", b =>
                {
                    b.Property<int>("ProposalsProposalId")
                        .HasColumnType("int");

                    b.Property<int>("TopicsTopicId")
                        .HasColumnType("int");

                    b.HasKey("ProposalsProposalId", "TopicsTopicId");

                    b.HasIndex("TopicsTopicId");

                    b.ToTable("ProposalTopic");
                });

            modelBuilder.Entity("TopicUser", b =>
                {
                    b.Property<int>("TopicsTopicId")
                        .HasColumnType("int");

                    b.Property<int>("UsersUserId")
                        .HasColumnType("int");

                    b.HasKey("TopicsTopicId", "UsersUserId");

                    b.HasIndex("UsersUserId");

                    b.ToTable("TopicUser");
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Model", b =>
                {
                    b.HasOne("BPGezinswetenschappen.DAL.Models.Make", "Make")
                        .WithMany("Models")
                        .HasForeignKey("MakeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Make");
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Project", b =>
                {
                    b.HasOne("BPGezinswetenschappen.DAL.Models.User", "Coach")
                        .WithMany("CoachProjects")
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("BPGezinswetenschappen.DAL.Models.Organisation", "Organisation")
                        .WithMany("Projects")
                        .HasForeignKey("OrganisationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BPGezinswetenschappen.DAL.Models.Proposal", "Proposal")
                        .WithMany("Projects")
                        .HasForeignKey("ProposalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BPGezinswetenschappen.DAL.Models.User", "Student")
                        .WithMany("StudentProjects")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Coach");

                    b.Navigation("Organisation");

                    b.Navigation("Proposal");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("ProjectTopic", b =>
                {
                    b.HasOne("BPGezinswetenschappen.DAL.Models.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectsProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BPGezinswetenschappen.DAL.Models.Topic", null)
                        .WithMany()
                        .HasForeignKey("TopicsTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProposalTopic", b =>
                {
                    b.HasOne("BPGezinswetenschappen.DAL.Models.Proposal", null)
                        .WithMany()
                        .HasForeignKey("ProposalsProposalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BPGezinswetenschappen.DAL.Models.Topic", null)
                        .WithMany()
                        .HasForeignKey("TopicsTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TopicUser", b =>
                {
                    b.HasOne("BPGezinswetenschappen.DAL.Models.Topic", null)
                        .WithMany()
                        .HasForeignKey("TopicsTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BPGezinswetenschappen.DAL.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Make", b =>
                {
                    b.Navigation("Models");
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Organisation", b =>
                {
                    b.Navigation("Projects");
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.Proposal", b =>
                {
                    b.Navigation("Projects");
                });

            modelBuilder.Entity("BPGezinswetenschappen.DAL.Models.User", b =>
                {
                    b.Navigation("CoachProjects");

                    b.Navigation("StudentProjects");
                });
#pragma warning restore 612, 618
        }
    }
}
