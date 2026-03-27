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
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly AuthAccessDbContext _context;
        public RefreshTokenRepository(AuthAccessDbContext context)
        {
            _context = context;
        }
        
        // Validate a refresh token
        public async Task<RefreshToken?> GetByHashAsync(string hash)
        {
            return await _context.RefreshTokens.
                FirstOrDefaultAsync(t => t.TokenHash == hash && t.RevokedOn == null && t.ExpiresAt > DateTime.UtcNow);
        }


        // Token rotation while refreshing 
        public async Task ReplaceAsync(string oldTokenHash, string newTokenHash, DateTime newExpiry)
        {
            var oldToken = await _context.RefreshTokens.FirstOrDefaultAsync(token => token.TokenHash == oldTokenHash);
            if (oldToken == null) return;
            
            oldToken.RevokedOn = DateTime.UtcNow;
            oldToken.ReplacedByHash = newTokenHash;

            var newToken = new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = oldToken.UserId,
                TokenHash = newTokenHash,
                CreatedOn = DateTime.UtcNow,
                ExpiresAt = newExpiry
            };

            _context.RefreshTokens.Add(newToken);
            await _context.SaveChangesAsync();
        }

        // Logout or invalidate the token
        public async Task RevokeAsync(string tokenHash)
        {
            var token = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == tokenHash);
            if(token != null)
            {
                token.RevokedOn = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }

        // store a new refresh token
        public async Task SaveAsync(RefreshToken token)
        {
            _context.RefreshTokens.Add(token);
            await _context.SaveChangesAsync();
        }
    }
}
