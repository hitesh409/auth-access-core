using AuthAccessCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthAccessCore.Infrastructure.Persistence.Configurations
{
    public class RoleModuleAccessConfiguration : IEntityTypeConfiguration<RoleModuleAccess>
    {
        public void Configure(EntityTypeBuilder<RoleModuleAccess> builder)
        {
            builder.ToTable("RoleRights");
            builder.HasKey(rm => new { rm.Role, rm.ModuleId});
            builder.Property(rm => rm.Role).HasConversion<int>().IsRequired();
            builder.Property(rm => rm.ModuleId).HasColumnName("moduleId").IsRequired();
            builder.Property(rm => rm.Permissions).HasColumnName("allowedAccessRights").HasConversion<int>().IsRequired();
            builder.Property<string>("createdBy");
            builder.Property<DateTime>("createdOn");
            builder.Property<string?>("updatedBy");
            builder.Property<DateTime?>("updatedOn");
            builder.Property<bool>("isDeleted");
        }
    }
}
