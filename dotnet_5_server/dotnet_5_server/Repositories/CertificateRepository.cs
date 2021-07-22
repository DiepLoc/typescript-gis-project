using dotnet_5_server.Data;
using dotnet_5_server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Repositories
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly SqlServerRealEstateContext dbContext;

        public CertificateRepository(SqlServerRealEstateContext context)
        {
            dbContext = context;
        }

        public async Task<Certificate> Add(Certificate newCertificate)
        {
            dbContext.Certificates.Add(newCertificate);
            await dbContext.SaveChangesAsync();

            return await dbContext
                .Certificates
                .Include(c => c.Locations)
                .FirstOrDefaultAsync(d => d.ID == newCertificate.ID);
        }

        public async Task Delete(int id)
        {
            var certificate = await dbContext.Certificates.FindAsync(id);

            if (certificate == null) throw new Exception("Certificate not found");

            dbContext.Certificates.Remove(certificate);
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Certificate>> GetAll(QueryParameter query)
        {
            IQueryable<Certificate> queryable = GetQuery(query);

            //while (await queryable.CountAsync() < 1 && query.Page > 1)
            //{
            //    query.Page = query.Page - 1;
            //    queryable = GetQuery(query);
            //}
            return await queryable.ToListAsync();
        }

        public async Task<Certificate> GetById(int id)
        {
            return await dbContext.Certificates.Include(d => d.Locations).FirstOrDefaultAsync(d => d.ID == id);
        }

        public async Task<int> GetTotalCount(QueryParameter query)
        {
            return await dbContext.Certificates.CountAsync();
        }

        public async Task Update(int id, Certificate newCertificate)
        {
            if (newCertificate != null && id != newCertificate.ID) throw new Exception("Bad request");

            var certificate = await dbContext.Certificates.FindAsync(id);

            if (certificate == null) throw new Exception("Not found");

            dbContext.Entry(certificate).State = EntityState.Detached;
            dbContext.Entry(newCertificate).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        private IQueryable<Certificate> GetQuery(QueryParameter query)
        {
            var pageSize = query.PageSize;
            var offset = query.Offset;

            IQueryable<Certificate> queryable = dbContext.Certificates
                .Include(c => c.Locations)
                .OrderByDescending(c => c.ID)
                .Skip(offset)
                .Take(pageSize);

            return queryable;
        }
    }
}
