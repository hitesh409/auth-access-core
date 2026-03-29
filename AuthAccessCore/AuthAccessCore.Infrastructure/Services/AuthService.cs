using AuthAccessCore.API.Helper;
using AuthAccessCore.Application.Common.Exceptions;
using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Application.Models.Auth;
using AuthAccessCore.Application.Services;
using AuthAccessCore.Domain.Entities;
using AuthAccessCore.Domain.Enums;
using Microsoft.Extensions.Configuration;

namespace AuthAccessCore.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;
        private readonly IModuleRepository _moduleRepo;
        private readonly ITokenService _tokenService;
        private readonly IAccessResolver _accessResolver;
        private readonly IRefreshTokenRepository _refreshTokenRepo;
        public AuthService(IConfiguration config, IUserRepository userRepo, IModuleRepository moduleRepo, ITokenService tokenService, IAccessResolver accessResolver, IRefreshTokenRepository refreshTokenRepo)
        {
            _config = config;
            _userRepo = userRepo;
            _moduleRepo = moduleRepo;
            _tokenService = tokenService;
            _accessResolver = accessResolver;
            _refreshTokenRepo = refreshTokenRepo;
        }
        public async Task<Guid> RegisterAsync(string email, string firstName, string lastName, string password, Roles role)
        {
            email = email.Trim().ToLowerInvariant();
            if (await _userRepo.IsExistEmailAsync(email))
                throw new ConflictException("User already exists");
            var passwordHash = PasswordHasher.Hash(password);

            var user = new User
            (
                firstName,
                lastName,
                email,
                role,
                passwordHash
            );

            await _userRepo.AddUserAsync(user);
            return user.UserId;
        }

        public async Task<LoginResult> LoginAsync(string email, string password)
        {

            email = email.Trim().ToLowerInvariant();
            var user = await _userRepo.GetByEmailAsync(email) ?? throw new UnauthorizedException("Invalid Credentials");
            if (!PasswordHasher.Verify(password, user.PasswordHash)) throw new UnauthorizedException("Invalid Credentials");

            var modulePermission = await ResolvePermissionsAsync(user.UserId, user.Role);

            // generate access token
            var accessToken = _tokenService.GenerateAccessToken(
                user.UserId,
                user.Role,
                modulePermission
            );

            // generate refresh token
            var (refreshToken, hash) = _tokenService.GenerateRefreshToken();

            var refreshTokenDays = int.Parse(_config["Jwt:refreshTokenDays"]);

            // save refreshToken entity
            await _refreshTokenRepo.SaveAsync(new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = user.UserId,
                TokenHash = hash,
                CreatedOn = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(refreshTokenDays)
            });

            return new LoginResult
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private async Task<Dictionary<Guid,Permissions>> ResolvePermissionsAsync(Guid userId, Roles role)
        {
            var modules = await _moduleRepo.GetAllAsync();
            var result = new Dictionary<Guid, Permissions>();

            foreach (var module in modules)
            {
                var permissions = _accessResolver.GetPermissions(userId, module.ModuleId, role);
                if(permissions != Permissions.None)
                {
                    result.Add(module.ModuleId, permissions);
                }
            }

            return result;
        }

    }
}
