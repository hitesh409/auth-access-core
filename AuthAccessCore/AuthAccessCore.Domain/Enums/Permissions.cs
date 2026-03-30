namespace AuthAccessCore.Domain.Enums;

[Flags]
public enum Permissions
{
    None = 0,
    View = 1,
    Create = 2,
    Update = 4,
    Delete = 8,
    Export = 16
}