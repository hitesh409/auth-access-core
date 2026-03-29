using AuthAccessCore.Application.Services;
using AuthAccessCore.Domain.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AuthAccessCore.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config) => _config = config;
        public string GenerateAccessToken(Guid userId, Roles role, Dictionary<Guid, Permissions> modulePermissions)
        {
            var jwtSections = _config.GetSection("Jwt");
            var key = jwtSections["key"];
            var issuer = jwtSections["issuer"];
            var audience = jwtSections["audience"];
            var accessTokenInMinutes = int.Parse(jwtSections["accessTokenMinutes"]);
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, role.ToString()),
            };

            foreach (var entry in modulePermissions)
            {
                claims.Add(new Claim("module", $"{entry.Key}:{(int)entry.Value}"));
            }

            var token = new JwtSecurityToken
            (
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(accessTokenInMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public (string token, string hash) GenerateRefreshToken()
        {
            var randomBytes = RandomNumberGenerator.GetBytes(64);
            var token = Convert.ToBase64String(randomBytes);
            var hash = ComputeHash(token);
            return (token, hash);
        }

        public string ComputeHash(string token)
        {
            using var sha256 = SHA256.Create();
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(token));
            return Convert.ToBase64String(hashBytes);
        }
    }
}
