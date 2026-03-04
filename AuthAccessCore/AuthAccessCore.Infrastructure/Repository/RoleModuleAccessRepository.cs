using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Domain.Enums;
using AuthAccessCore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AuthAccessCore.Infrastructure.Repository
{
    public class RoleModuleAccessRepository : IRoleModuleAccessRepository
    {
        private readonly AuthAccessDbContext _dbContext;
        public RoleModuleAccessRepository(AuthAccessDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Permissions GetPermissions(Roles role, Guid moduleId)
        {
            Permissions permissions = _dbContext.RoleModulesAccess
                                      .AsNoTracking()
                                      .Where(rm => rm.Role == role && rm.ModuleId == moduleId)
                                      .Select(rm => rm.Permissions)
                                      .FirstOrDefault();
            return permissions;
        }
    }
}
