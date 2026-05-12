using AuthAccessCore.Domain.Enums;

namespace AuthAccessCore.Domain.Entities
{
    public class Module
    {
        public Guid ModuleId { get; private set; }
        public string ModuleName { get; private set; }
        public Permissions AllowedPermissions { get; private set; }
        public Guid? ParentId { get; private set; }
        public Module? Parent { get; private set; }

        // Navigation
        public ICollection<Module> ChildModules { get; private set; } = new List<Module>();
        public ICollection<UserModuleAccess> UserModuleAccesses { get; private set; } = new List<UserModuleAccess>();
        public ICollection<RoleModuleAccess> RoleModuleAccesses { get; private set; } = new List<RoleModuleAccess>();

        public Module(Guid moduleId,string moduleName,Permissions allowedPermissions)
        {
            if (moduleId == Guid.Empty)
                throw new ArgumentException("ModuleId can not be null");
            if (string.IsNullOrEmpty(moduleName))
                throw new ArgumentException("ModuleName can not be null or empty");

            ModuleId = moduleId;
            ModuleName = moduleName;
            AllowedPermissions = allowedPermissions;
        }
    }
}
