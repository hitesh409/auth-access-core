using AuthAccessCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthAccessCore.Infrastructure.Persistence
{
    public class AuthAccessDbContext : DbContext
    {
        public AuthAccessDbContext(DbContextOptions<AuthAccessDbContext> options) : base(options) 
        { 
        
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<UserModuleAccess> UserModulesAccess { get; set; }
        public DbSet<RoleModuleAccess> RoleModulesAccess { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}
