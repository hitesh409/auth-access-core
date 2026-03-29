using AuthAccessCore.API.Helper;
using AuthAccessCore.API.Models.Auth;
using AuthAccessCore.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthAccessCore.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService) => _authService = authService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var userId = await _authService.RegisterAsync(request.Email,request.FirstName,request.LastName, request.Password, request.Role);
            return Ok(new { userId, message = "User registed successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request.Email, request.Password);

            Response.Cookies.Append("refreshTohen",result.RefreshToken,new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict
            });

            return Ok(new { accessToken = result.AccessToken });
        }
    }
}
