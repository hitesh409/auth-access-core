using AuthAccessCore.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthAccessCore.Application.Services
{
    public interface IAuthService
    {
        Task<Guid> RegisterAsync(string email, string firstName, string LastName, string password, Roles role);
    }
}
