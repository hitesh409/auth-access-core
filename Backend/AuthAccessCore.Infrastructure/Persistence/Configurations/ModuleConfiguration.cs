using AuthAccessCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthAccessCore.Infrastructure.Persistence.Configurations
{
    public class ModuleConfiguration : IEntityTypeConfiguration<Module>
    {
        public void Configure(EntityTypeBuilder<Module> builder)
        {
            builder.ToTable("AppModules");
            builder.HasKey(m => m.ModuleId);
            builder.Property(m => m.ModuleId).HasColumnName("id").IsRequired();
            builder.Property(m=>m.ModuleName).HasColumnName("moduleName").IsRequired();
            builder.Property(m => m.AllowedPermissions).HasColumnName("accessLevel").HasConversion<int>().IsRequired();
            builder.Property<int?>("parentId");
            builder.Property<int>("displayOrder");
            builder.Property<string>("createdBy");
            builder.Property<DateTime>("createdOn");
            builder.Property<bool>("isDeleted");
        }
    }
}
