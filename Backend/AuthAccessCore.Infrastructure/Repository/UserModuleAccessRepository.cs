using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Domain.Enums;
using AuthAccessCore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AuthAccessCore.Infrastructure.Repository
{
    public class UserModuleAccessRepository : IUserModuleAccessRepository
    {
        private readonly AuthAccessDbContext _dbContext;

        public UserModuleAccessRepository(AuthAccessDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Permissions GetPermissions(Guid userId, Guid moduleId)
        {
            Permissions permissions = _dbContext.UserModulesAccess.
                                        AsNoTracking()
                                        .Where(um => um.UserId == userId && um.ModuleId == moduleId)
                                        .Select(um => um.Permissions)
                                        .FirstOrDefault();
            return permissions;
        }
    }
}
