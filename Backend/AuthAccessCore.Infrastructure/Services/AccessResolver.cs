using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Application.Services;
using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Infrastructure.Services
{
    public class AccessResolver : IAccessResolver
    {
        private readonly IUserModuleAccessRepository _userModuleAccess;
        private readonly IRoleModuleAccessRepository _roleModuleAccess;
        private readonly IModuleRepository _moduleRepo;
        public AccessResolver(IUserModuleAccessRepository userModuleAccess, IRoleModuleAccessRepository roleModuleAccess, IModuleRepository moduleRepo) 
        { 
            _userModuleAccess = userModuleAccess;    
            _roleModuleAccess = roleModuleAccess;
            _moduleRepo = moduleRepo;
        }
        public Permissions GetPermissions(Guid userId, Guid moduleId, Roles role)
        {
            var module = _moduleRepo.GetById(moduleId);
            if (module == null) return Permissions.None;

            Permissions resolvedPermission;

            Permissions userPermission = _userModuleAccess.GetPermissions(userId, moduleId);
            if (userPermission != Permissions.None) // user centric permission
                resolvedPermission = userPermission;
            else
                resolvedPermission = _roleModuleAccess.GetPermissions(role, moduleId); // role-modulewise permission

            return resolvedPermission & module.AllowedPermissions; // capability mask
        }
    }
}
