using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
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
}
