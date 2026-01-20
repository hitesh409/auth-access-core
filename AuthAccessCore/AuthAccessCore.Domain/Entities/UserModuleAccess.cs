using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Domain.Entities
{
    public class UserModuleAccess
    {
        public Guid UserId { get; private set; }
        public Guid ModuleId { get; private set; }
        public Permissions Permissions { get; private set; }

        public UserModuleAccess(Guid userId, Guid moduleId, Permissions permissions) {
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId cannot be empty.");

            if (moduleId == Guid.Empty)
                throw new ArgumentException("ModuleId cannot be empty.");
            this.UserId = userId;
            this.ModuleId = moduleId;
            this.Permissions = permissions;
        }
        public void UpdatePermissions(Permissions permissions)
        {
            Permissions = permissions;
        }
    }
}
