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
        }
    }
}
