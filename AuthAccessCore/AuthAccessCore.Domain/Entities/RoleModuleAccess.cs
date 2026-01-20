using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Domain.Entities
{
    public class RoleModuleAccess
    {
        public Roles Role {  get; private set; }
        public Guid ModuleId { get; private set; }
        public Permissions Permissions { get; private set; }

        public RoleModuleAccess(Roles role, Guid moduleId, Permissions permissions) {
            if (role == Roles.None)
                throw new ArgumentException("Role must be specified.");

            if (moduleId == Guid.Empty)
                throw new ArgumentException("ModuleId cannot be empty.");
            this.Role = role;
            this.ModuleId = moduleId;
            this.Permissions = permissions;
        }
        public void UpdatePermissions(Permissions permissions)
        {
            Permissions = permissions;
        }
    }
}
