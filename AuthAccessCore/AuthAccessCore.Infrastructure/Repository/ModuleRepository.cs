using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Domain.Entities;
using AuthAccessCore.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace AuthAccessCore.Infrastructure.Repository
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly AuthAccessDbContext _dbContext;
        public ModuleRepository(AuthAccessDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public Module? GetById(Guid moduleId)
        {
            return _dbContext.Modules
                    .AsNoTracking()
                    .FirstOrDefault(m => m.ModuleId == moduleId);
        }
    }
}
