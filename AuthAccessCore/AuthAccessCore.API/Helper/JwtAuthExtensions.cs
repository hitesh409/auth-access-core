using AuthAccessCore.Domain.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthAccessCore.API.Helper
{
    public static class JwtAuthExtensions
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration config)
        {
            var jwtSections = config.GetSection("Jwt");
            if (string.IsNullOrWhiteSpace(jwtSections["key"]))
                throw new InvalidOperationException("JWT signing key is missing");

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSections["key"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = jwtSections["issuer"],
                            ValidateAudience = true,
                            ValidAudience = jwtSections["audience"],
                            ValidateLifetime = true,
                            ClockSkew = TimeSpan.Zero,
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = signingKey
                        };
                    });
            return services;
        }
    }

    public static class JwtTokenGenerator
    {
        public static string GenerateAccessToken(Guid userId, Roles role, Dictionary<Guid, Permissions> modulePermissions, IConfiguration config)
        {
            var jwtSections = config.GetSection("Jwt");
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
    }
}
