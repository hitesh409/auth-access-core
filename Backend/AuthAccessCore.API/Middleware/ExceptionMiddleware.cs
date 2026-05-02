using AuthAccessCore.Application.Common;
using AuthAccessCore.Application.Common.Exceptions;
using System.Text.Json;
using System.Threading.Tasks;

namespace AuthAccessCore.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment environment)
        {
            _next = next;
            _logger = logger;
            _environment = environment;
        }

        public async Task Invoke(HttpContext context)
        {
            try { await _next(context); }
            catch (Exception ex) { await HandleException(context, ex); }
        }

        private async Task HandleException(HttpContext context,Exception ex)
        {
            // Default (fallback)
            var statusCode = StatusCodes.Status500InternalServerError;
            var title = "Internal Server Error";
            var detail = "An unexpected error occurred";

            // Handle known application exceptions
            if (ex is AppException appException)
            {
                statusCode = appException.StatusCode;
                title = GetTitle(statusCode);
                detail = appException.Message;
            }

            _logger.LogError(ex,
               "Error occurred. TraceId: {TraceId}, Path: {Path}",
               context.TraceIdentifier,
               context.Request.Path);

            var response = new ProblemDetailsResponse
            {
                Status = statusCode,
                Title = title,
                Detail = _environment.IsDevelopment() ? ex.Message : detail,
                TraceId = context.TraceIdentifier,
                Path = context.Request.Path,
                Timestamp = DateTime.UtcNow
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));

        }

        private static string GetTitle(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request",
                401 => "Unauthorized",
                403 => "Forbidden",
                404 => "Not Found",
                409 => "Conflict",
                _ => "Error"
            };
        }
    }
}
