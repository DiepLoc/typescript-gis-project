using Microsoft.EntityFrameworkCore.Migrations;

namespace dotnet_5_server.Migrations
{
    public partial class newInit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Certificates",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LandParcel = table.Column<int>(type: "int", nullable: false),
                    MapSheet = table.Column<int>(type: "int", nullable: false),
                    Acreage = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certificates", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Order = table.Column<int>(type: "int", nullable: false),
                    LatitudeY = table.Column<float>(type: "real", nullable: false),
                    LongitudeX = table.Column<float>(type: "real", nullable: false),
                    CertificateID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Locations_Certificates_CertificateID",
                        column: x => x.CertificateID,
                        principalTable: "Certificates",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Locations_CertificateID",
                table: "Locations",
                column: "CertificateID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Certificates");
        }
    }
}
