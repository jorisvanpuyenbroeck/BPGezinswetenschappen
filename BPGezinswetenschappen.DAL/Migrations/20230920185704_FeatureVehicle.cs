using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BPGezinswetenschappen.DAL.Migrations
{
    /// <inheritdoc />
    public partial class FeatureVehicle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeatureVehicle_Feature_FeaturesId",
                table: "FeatureVehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_FeatureVehicle_Vehicle_VehiclesId",
                table: "FeatureVehicle");

            migrationBuilder.RenameColumn(
                name: "VehiclesId",
                table: "FeatureVehicle",
                newName: "VehicleId");

            migrationBuilder.RenameColumn(
                name: "FeaturesId",
                table: "FeatureVehicle",
                newName: "FeatureId");

            migrationBuilder.RenameIndex(
                name: "IX_FeatureVehicle_VehiclesId",
                table: "FeatureVehicle",
                newName: "IX_FeatureVehicle_VehicleId");

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

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "FeatureVehicle",
                newName: "VehiclesId");

            migrationBuilder.RenameColumn(
                name: "FeatureId",
                table: "FeatureVehicle",
                newName: "FeaturesId");

            migrationBuilder.RenameIndex(
                name: "IX_FeatureVehicle_VehicleId",
                table: "FeatureVehicle",
                newName: "IX_FeatureVehicle_VehiclesId");

            migrationBuilder.AddForeignKey(
                name: "FK_FeatureVehicle_Feature_FeaturesId",
                table: "FeatureVehicle",
                column: "FeaturesId",
                principalTable: "Feature",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FeatureVehicle_Vehicle_VehiclesId",
                table: "FeatureVehicle",
                column: "VehiclesId",
                principalTable: "Vehicle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
