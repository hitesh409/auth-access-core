using AuthAccessCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthAccessCore.Infrastructure.Persistence.Configurations
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            builder.ToTable("UserRefreshTokens");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.TokenHash).IsRequired().HasMaxLength(500);
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.ExpiresAt).IsRequired();
            builder.Property(x => x.CreatedOn).IsRequired();
            builder.Property(x => x.RevokedOn);
            builder.Property(x => x.ReplacedByHash);

        }
    }
}
