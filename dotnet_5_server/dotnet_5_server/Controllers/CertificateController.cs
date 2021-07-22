using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet_5_server.Models;
using dotnet_5_server.Repositories;
using dotnet_5_server.Data;

namespace dotnet_5_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly ICertificateRepository repo;

        public CertificateController(ICertificateRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Certificate>> GetCertificateById(int id)
        {
            var certificate = await repo.GetById(id);
            if (certificate == null)
            {
                return NotFound();
            }
            return certificate;
        }

        [HttpGet]
        public async Task<Object> GetAllCertificates([FromQuery] QueryParameter queryParam)
        {
            var certificates = await repo.GetAll(queryParam);
            var count = await repo.GetTotalCount(queryParam);

            if (certificates == null) return NotFound();
            var (pageSize, page) = queryParam;
            return new { certificates, pageInfo = new { pageSize, page, count, pageCount = (int)Math.Ceiling((double)count / pageSize) } };
        }

        [HttpPost]
        public async Task<ActionResult<Certificate>> AddCertificate(Certificate newCertificate)
        {
            var certificate = await repo.Add(newCertificate);
            return certificate;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCertificate(int id, Certificate newCertificate)
        {
            await repo.Update(id, newCertificate);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCertificate(int id)
        {
            var certificate = await repo.GetById(id);
            if (certificate == null) return NotFound();

            await repo.Delete(id);
            return NoContent();
        }
    }
}
