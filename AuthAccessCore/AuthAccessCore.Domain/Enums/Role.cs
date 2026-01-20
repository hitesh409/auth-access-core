namespace AuthAccessCore.Domain.Enums;

[Flags]
public enum Roles
{
    None = 0,
    User = 1,
    Manager = 2,
    Admin = 4,
    SuperAdmin = 8
}
