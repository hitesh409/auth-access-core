namespace AuthAccessCore.Domain.Entities
{
    public class Module
    {
        public Guid ModuleId { get; private set; }
        public string ModuleName { get; private set; }

        public Module(Guid moduleId,string moduleName)
        {
            if (moduleId == Guid.Empty)
                throw new ArgumentException("ModuleId can not be null");
            if (string.IsNullOrEmpty(moduleName))
                throw new ArgumentException("ModuleName can not be null or empty");

            ModuleId = moduleId;
            ModuleName = moduleName;
        }
    }
}
