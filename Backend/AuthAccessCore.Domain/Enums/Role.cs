namespace AuthAccessCore.Domain.Enums;

[Flags]
public enum Roles
{
    None = 0,
    SuperAdmin = 1,     // Full Admin
    Admin = 2,          // Scoped Admin
    AccessAuditor = 3,  // Read-Only Access
    SupportAdmin = 4,   // Operational Role
    User = 5            // Basic User
}
