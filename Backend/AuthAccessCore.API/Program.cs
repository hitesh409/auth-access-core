using AuthAccessCore.API.Authorization;
using AuthAccessCore.API.Helper;
using AuthAccessCore.API.Middleware;
using AuthAccessCore.Application.Interfaces;
using AuthAccessCore.Application.Services;
using AuthAccessCore.Infrastructure.Persistence;
using AuthAccessCore.Infrastructure.Repository;
using AuthAccessCore.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
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

// Application Service
builder.Services.AddScoped<IAccessResolver, AccessResolver>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// JWT Authentication
builder.Services.AddJwtAuthentication(builder.Configuration);

builder.Services.AddAuthorization();
builder.Services.AddSingleton<IAuthorizationHandler, PermissionHandler>();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();

// CORS handler
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientPolicy", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors("ClientPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
