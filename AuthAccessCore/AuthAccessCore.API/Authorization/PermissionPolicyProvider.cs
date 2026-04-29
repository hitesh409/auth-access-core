using AuthAccessCore.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace AuthAccessCore.API.Authorization
{
    public class PermissionPolicyProvider : DefaultAuthorizationPolicyProvider
    {
        public PermissionPolicyProvider(IOptions<AuthorizationOptions> options) : base(options) { }

        public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
        {
            if (policyName.Contains(":"))
            {
                var parts = policyName.Split(':');
                if (parts.Length == 2 && Enum.TryParse(parts[1], out Permissions permission))
                {
                    var module = parts[0];
                    var policy = new AuthorizationPolicyBuilder().AddRequirements(new PermissionRequirement(module,permission)).Build();
                    return policy;
                }
            }
            return await base.GetPolicyAsync(policyName);
        }
    }
}
