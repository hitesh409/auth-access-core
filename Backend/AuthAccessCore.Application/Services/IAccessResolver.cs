using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Application.Services
{
    public interface IAccessResolver
    {
        public Permissions GetPermissions(Guid userId, Guid moduleId, Roles role);
    }
}
