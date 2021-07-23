using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet_5_server.Models;
using dotnet_5_server.Data;

namespace dotnet_5_server.Repositories
{
    public interface ICertificateRepository
    {
        Task<IEnumerable<Certificate>> GetAll(QueryParameter query);

        Task<Certificate> GetById(int id);

        Task<Certificate> Add(Certificate newCertificate);

        Task Update(int id, Certificate newCertificate);

        Task Delete(int id);

        Task<int> GetTotalCount(QueryParameter query);

        Task AddLocation(int id, Location location);

        Task RemoveLocation(int locationId);

    }
}
