using System.Security.Cryptography;
using System.Text;

namespace AuthAccessCore.API.Helper
{
    public static class RefreshTokenGeneratorcs
    {
        public static (string token, string hash) Generate()
        {
            var randomBytes = RandomNumberGenerator.GetBytes(64);
            var token = Convert.ToBase64String(randomBytes);
            var hash = ComputeHash(token);
            return (token, hash);
        }

        public static string ComputeHash(string token)
        { 
            using var sha264 = SHA256.Create();
            var hashBytes = sha264.ComputeHash(Encoding.UTF8.GetBytes(token));
            return Convert.ToBase64String(hashBytes);
        }

    }
}
