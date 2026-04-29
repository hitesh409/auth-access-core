using AuthAccessCore.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace AuthAccessCore.API.Authorization
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            var claims = context.User.FindAll("module");
            foreach (var claim in claims)
            {
                var parts = claim.Value.Split(':');
                if(parts.Length != 2) continue;
                var module = parts[0];
                if(!Enum.TryParse(parts[1], out Permissions permission)) continue;

                // bitwise check
                if(module == requirement.Module && (permission & requirement.Permission) == requirement.Permission)
                {
                        context.Succeed(requirement);
                        return Task.CompletedTask;
                }

            }
                return Task.CompletedTask;
        }
    }
}
