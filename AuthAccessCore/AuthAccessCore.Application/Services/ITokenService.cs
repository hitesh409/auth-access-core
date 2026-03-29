using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Application.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(Guid userId, Roles role, Dictionary<Guid, Permissions> modulePermissions);
        (string token, string hash) GenerateRefreshToken();
        string ComputeHash(string token);
    }
}
