using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Application.Services
{
    public class AccessResolver : IAccessResolver
    {
        private readonly IUserModuleAccessRepository _userModuleAccess;
        private readonly IRoleModuleAccessRepository _roleModuleAccess;
        public AccessResolver(IUserModuleAccessRepository userModuleAccess, IRoleModuleAccessRepository roleModuleAccess) 
        { 
            _userModuleAccess = userModuleAccess;    
            _roleModuleAccess = roleModuleAccess;
        }
        public Permissions GetPermissions(Guid userId, Guid moduleId, Roles role)
        {
            Permissions userPermission = _userModuleAccess.GetPermissions(userId, moduleId);
            if (userPermission != Permissions.None)
                return userPermission;

            Permissions RolePermission = _roleModuleAccess.GetPermissions(role, moduleId);
            return RolePermission;
        }
    }
}
