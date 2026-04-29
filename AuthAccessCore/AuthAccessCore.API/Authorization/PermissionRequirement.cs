using AuthAccessCore.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace AuthAccessCore.API.Authorization
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public string Module { get; }
        public Permissions Permission { get; }
        public PermissionRequirement(string module, Permissions permission)
        {
            Module = module;
            Permission = permission;
        }
    }
}
