using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Domain.Entities
{
    public class User
    {
        public Guid UserId { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public Roles Role { get; private set; }
        private User() { }

        public User(string FirstName, string LastName, string Email, Roles Role, string passwordHash)
        {
            if (string.IsNullOrEmpty(FirstName))
                throw new ArgumentException("FirstName is Required");

            if (string.IsNullOrEmpty(LastName))
                throw new ArgumentException("LastName is Required");

            if (string.IsNullOrEmpty(Email))
                throw new ArgumentException("Email is Required");

            this.UserId = Guid.NewGuid();
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.Role = Role;
            this.PasswordHash = passwordHash;
        }
    }
}
