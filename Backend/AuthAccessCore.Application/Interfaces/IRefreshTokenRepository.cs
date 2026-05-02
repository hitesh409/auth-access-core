using AuthAccessCore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthAccessCore.Application.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task SaveAsync(RefreshToken token);
        Task<RefreshToken?> GetByHashAsync(string hash);
        Task RevokeAsync(string tokenHash);
        Task ReplaceAsync(string oldTokenHash, string newTokenHash, DateTime newExpiry);

    }
}
