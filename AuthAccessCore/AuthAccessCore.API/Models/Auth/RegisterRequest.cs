using AuthAccessCore.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace AuthAccessCore.API.Models.Auth
{
    public class RegisterRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public Roles Role { get; set; }
    }
}
