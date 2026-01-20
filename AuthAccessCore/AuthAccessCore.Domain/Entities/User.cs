using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Domain.Entities
{
    public class User
    {
        public Guid UserId { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public Roles Roles { get; private set; }

        public User(Guid UserId, string FirstName, string LastName, string Email, Roles Roles) { 

            if (UserId == Guid.Empty)
                throw new ArgumentException("UserId can not be null or empty");

            if (string.IsNullOrEmpty(FirstName))
                throw new ArgumentException("FirstName is Required");

            if (string.IsNullOrEmpty(LastName))
                throw new ArgumentException("LastName is Required");

            if (string.IsNullOrEmpty(Email))
                throw new ArgumentException("Email is Required");

            this.UserId = UserId;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.Roles = Roles;
        }
    }
}
