using AuthAccessCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthAccessCore.Infrastructure.Persistence.Configurations
{
    public class UserModuleAccessConfiguration : IEntityTypeConfiguration<UserModuleAccess>
    {
        public void Configure(EntityTypeBuilder<UserModuleAccess> builder)
        {
            builder.ToTable("UserRights");
            builder.HasKey(um => new { um.UserId, um.ModuleId });
            builder.Property(rm => rm.UserId).IsRequired();
            builder.Property(rm => rm.ModuleId).IsRequired();
            builder.Property(rm => rm.Permissions).HasColumnName("allowedAccessRights").HasConversion<int>().IsRequired();
            builder.Property<string>("createdBy");
            builder.Property<DateTime>("createdOn");
            builder.Property<string?>("updatedBy");
            builder.Property<DateTime?>("updatedOn");
            builder.Property<bool>("isDeleted");
        }
    }
}
