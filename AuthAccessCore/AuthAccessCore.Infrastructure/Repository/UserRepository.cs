using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Domain.Entities;
using AuthAccessCore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthAccessCore.Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AuthAccessDbContext _context;
        public UserRepository(AuthAccessDbContext context) {
            _context = context;
        }

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Email == email);     
        }

        public async Task<bool> IsExistEmailAsync(string enmail)
        {
            return await _context.Users.AsNoTracking().AnyAsync(x => x.Email == enmail);
        }
    }
}
