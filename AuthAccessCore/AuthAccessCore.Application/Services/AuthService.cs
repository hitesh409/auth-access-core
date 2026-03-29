using AuthAccessCore.API.Helper;
using AuthAccessCore.Application.Common.Exceptions;
using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Domain.Entities;
using AuthAccessCore.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthAccessCore.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        public AuthService(IUserRepository userRepo) => _userRepo = userRepo;

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
    }
}
