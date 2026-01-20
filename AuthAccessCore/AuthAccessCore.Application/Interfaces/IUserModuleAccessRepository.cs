using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Application.Interfaces
{
    public interface IUserModuleAccessRepository
    {
        public Permissions GetPermissions(Guid userId, Guid moduleId);
    }
}
