using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RefactoringMosh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Featurevehicle_Feature_FeaturesId",
                table: "Featurevehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_Featurevehicle_Vehicle_VehiclesId",
                table: "Featurevehicle");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Featurevehicle",
                table: "Featurevehicle");

            migrationBuilder.RenameTable(
                name: "Featurevehicle",
                newName: "FeatureVehicle");

            migrationBuilder.RenameColumn(
                name: "VehiclesId",
                table: "FeatureVehicle",
                newName: "FeatureId");

            migrationBuilder.RenameColumn(
                name: "FeaturesId",
                table: "FeatureVehicle",
                newName: "VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_Featurevehicle_VehiclesId",
                table: "FeatureVehicle",
                newName: "IX_FeatureVehicle_FeatureId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FeatureVehicle",
                table: "FeatureVehicle",
                columns: new[] { "VehicleId", "FeatureId" });

            migrationBuilder.AddForeignKey(
                name: "FK_FeatureVehicle_Feature_FeatureId",
                table: "FeatureVehicle",
                column: "FeatureId",
                principalTable: "Feature",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FeatureVehicle_Vehicle_VehicleId",
                table: "FeatureVehicle",
                column: "VehicleId",
                principalTable: "Vehicle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeatureVehicle_Feature_FeatureId",
                table: "FeatureVehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_FeatureVehicle_Vehicle_VehicleId",
                table: "FeatureVehicle");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FeatureVehicle",
                table: "FeatureVehicle");

            migrationBuilder.RenameTable(
                name: "FeatureVehicle",
                newName: "Featurevehicle");

            migrationBuilder.RenameColumn(
                name: "FeatureId",
                table: "Featurevehicle",
                newName: "VehiclesId");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "Featurevehicle",
                newName: "FeaturesId");

            migrationBuilder.RenameIndex(
                name: "IX_FeatureVehicle_FeatureId",
                table: "Featurevehicle",
                newName: "IX_Featurevehicle_VehiclesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Featurevehicle",
                table: "Featurevehicle",
                columns: new[] { "FeaturesId", "VehiclesId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Featurevehicle_Feature_FeaturesId",
                table: "Featurevehicle",
                column: "FeaturesId",
                principalTable: "Feature",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Featurevehicle_Vehicle_VehiclesId",
                table: "Featurevehicle",
                column: "VehiclesId",
                principalTable: "Vehicle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
