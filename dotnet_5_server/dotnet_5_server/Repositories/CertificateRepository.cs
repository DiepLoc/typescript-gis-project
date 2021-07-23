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
            if (id != newCertificate.ID) throw new Exception("Bad request");

            //dbContext.Entry(certificate).State = EntityState.Detached;
            //dbContext.Entry(newCertificate).State = EntityState.Modified;
            dbContext.Certificates.Update(newCertificate);
            await dbContext.SaveChangesAsync();
        }

        public async Task AddLocation(int id, Location location)
        {
            var certificate = await dbContext.Certificates.FindAsync(id);
            if (certificate == null) throw new Exception("Bad request");

            location.CertificateID = id;
            certificate.Locations.Add(location);
            await dbContext.SaveChangesAsync();
        }

        public async Task RemoveLocation(int locationId)
        {
            var location = await dbContext.Locations.FindAsync(locationId);
            if (location == null) throw new Exception("Bad request");
            dbContext.Locations.Remove(location);
            await dbContext.SaveChangesAsync();
        }

        private IQueryable<Certificate> GetQuery(QueryParameter query)
        {
            var pageSize = query.PageSize;
            var offset = query.Offset;
            var page = query.Page;
            var sortBy = query.SortBy;

            IQueryable<Certificate> queryable = dbContext.Certificates
                .Include(c => c.Locations);

            switch(sortBy)
            {
                case QueryParameter.SortByEnum.ID: 
                    queryable = queryable.OrderByDescending(c => c.ID);
                    break;
                case QueryParameter.SortByEnum.LandParcel:
                    queryable = queryable.OrderBy(c => c.LandParcel);
                    break;
                case QueryParameter.SortByEnum.MapSheet:
                    queryable = queryable.OrderBy(c => c.MapSheet);
                    break;
                case QueryParameter.SortByEnum.OwnerName:
                    queryable = queryable.OrderBy(c => c.OwnerName);
                    break;
                case QueryParameter.SortByEnum.Acreage:
                    queryable = queryable.OrderBy(c => c.Acreage);
                    break;
            }
            queryable = queryable
                .Skip(offset + pageSize * (page - 1))
                .Take(pageSize);

            return queryable;
        }
    }
}
