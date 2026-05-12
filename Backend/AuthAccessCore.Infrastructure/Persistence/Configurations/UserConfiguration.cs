using AuthAccessCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AuthAccessCore.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(u => u.UserId);
            builder.Property(u => u.UserId).HasColumnName("userId").IsRequired();
            builder.Property(u => u.FirstName).HasColumnName("firstName").IsRequired();
            builder.Property(u => u.LastName).HasColumnName("lastName").IsRequired();
            builder.Property(u => u.Email).HasColumnName("email").IsRequired();
            builder.HasIndex(u => u.Email).IsUnique();
            builder.Property(u => u.PasswordHash).HasColumnName("passwordHash").IsRequired();
            builder.Property(u => u.Role).HasConversion<int>().HasColumnName("role").IsRequired();
            builder.Property(u => u.ProfileImageUrl).HasColumnName("profileImageUrl").HasMaxLength(500);
            builder.Property(u => u.HasRequestedRoleUpgrade).HasDefaultValue(false);
            builder.Property(u => u.LastLoginAt).HasColumnName("lastLoginAt");
            builder.Property(u => u.IsActive).HasDefaultValue(true);
            builder.Property(u => u.UpdatedAt).HasColumnName("updatedon");
            builder.Property(u => u.UpdatedBy).HasColumnName("updatedby");
        }
    }
}
