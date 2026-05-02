using AuthAccessCore.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace AuthAccessCore.API.Authorization
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
      public HasPermissionAttribute(string module, Permissions permission) 
      {
            Policy = $"{module}:{permission}";
      }
    }
}
