using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;

namespace dotnet_5_server.Controllers
{
    [AllowAnonymous]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : ControllerBase
    {
        [Route("error")]
        public async Task Error()
        {
            var exception = HttpContext.Features.Get<IExceptionHandlerPathFeature>().Error;
            var code = 500;
            var message = filterError(exception.InnerException?.Message ?? exception.Message);
            var response = JsonSerializer.Serialize(
                        new { message = message, error = exception.Message, statusCode = code });
            HttpContext.Response.StatusCode = code;
            HttpContext.Response.ContentType = "application/json";
            await HttpContext.Response.WriteAsync(response);
        }

        private string filterError(string message)
        {
            if (message.Contains("UNIQUE constraint failed"))
            {
                string targetField;
                string[] messageArray = message.Split("'");
                if (messageArray.Length < 2) return message;

                string content = messageArray[1];
                if (content.Contains("."))
                {
                    var fieldArray = content.Split(".");
                    targetField = fieldArray[fieldArray.Length - 1];
                }
                else
                {
                    var fieldArray = content.Split(":");
                    targetField = fieldArray[fieldArray.Length - 1];
                }
                return targetField.ToUpper() + " already exists";
            }
            return message;
        }
    }
}
