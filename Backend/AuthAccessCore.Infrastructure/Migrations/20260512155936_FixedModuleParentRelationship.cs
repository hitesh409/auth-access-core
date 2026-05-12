using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthAccessCore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixedModuleParentRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "parentId",
                table: "AppModules");

            migrationBuilder.AlterColumn<Guid>(
                name: "parentId",
                table: "AppModules",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppModules_parentId",
                table: "AppModules",
                column: "parentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppModules_AppModules_parentId",
                table: "AppModules",
                column: "parentId",
                principalTable: "AppModules",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "parentId",
                table: "AppModules");

            migrationBuilder.AddColumn<int>(
                name: "parentId",
                table: "AppModules",
                type: "int",
                nullable: true);

            migrationBuilder.DropForeignKey(
                name: "FK_AppModules_AppModules_parentId",
                table: "AppModules");

            migrationBuilder.DropIndex(
                name: "IX_AppModules_parentId",
                table: "AppModules");

            migrationBuilder.AlterColumn<int>(
                name: "parentId",
                table: "AppModules",
                type: "int",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }
    }
}
