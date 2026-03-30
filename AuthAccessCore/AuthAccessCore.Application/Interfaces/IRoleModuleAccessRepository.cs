using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Application.Interfaces
{
    public interface IRoleModuleAccessRepository
    {
        public Permissions GetPermissions(Roles role, Guid moduleId);
    }
}
