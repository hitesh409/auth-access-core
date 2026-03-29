using AuthAccessCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthAccessCore.Application.Interfaces
{
    public interface IUserRepository
    {
        public Task<User?> GetByEmailAsync(string email);
        public Task AddUserAsync(User user);
        public Task<bool> IsExistEmailAsync(string email);
    }
}
