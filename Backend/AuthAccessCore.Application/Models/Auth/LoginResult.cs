using AuthAccessCore.Domain.Entities;

namespace AuthAccessCore.Application.Models.Auth
{
    public class LoginResult
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public object UserContext { get; set; }
    }
}
