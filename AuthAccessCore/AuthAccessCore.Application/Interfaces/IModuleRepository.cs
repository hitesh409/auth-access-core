using AuthAccessCore.Domain.Entities;

namespace AuthAccessCore.Application.Interfaces
{
    public interface IModuleRepository
    {
        Module? GetById(Guid moduleId);
    }
}
