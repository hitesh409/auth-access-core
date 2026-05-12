namespace AuthAccessCore.Domain.Enums;

[Flags]
public enum Roles
{
    None = 0,
    SuperAdmin = 1,
    Admin = 2,
    Manager = 3,
    Employee = 4,
    Viewer = 5
}
