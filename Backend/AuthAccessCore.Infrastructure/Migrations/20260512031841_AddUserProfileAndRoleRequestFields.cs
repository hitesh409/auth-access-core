using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthAccessCore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserProfileAndRoleRequestFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasRequestedRoleUpgrade",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "lastLoginAt",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "profileImageUrl",
                table: "Users",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "updatedby",
                table: "Users",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "updatedon",
                table: "Users",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasRequestedRoleUpgrade",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "lastLoginAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "profileImageUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "updatedby",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "updatedon",
                table: "Users");
        }
    }
}
