using AuthAccessCore.API.Helper;
using AuthAccessCore.API.Middleware;
using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Application.Services;
using AuthAccessCore.Infrastructure.Persistence;
using AuthAccessCore.Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configure DbContext
builder.Services.AddDbContext<AuthAccessDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("con"));
});

// Repositories
builder.Services.AddScoped<IUserModuleAccessRepository, UserModuleAccessRepository>();
builder.Services.AddScoped<IRoleModuleAccessRepository, RoleModuleAccessRepository>();
builder.Services.AddScoped<IModuleRepository, ModuleRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Application Service
builder.Services.AddScoped<IAccessResolver, AccessResolver>();

// JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
