using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnet_5_server.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_5_server.Data
{
    public class SqlServerRealEstateContext : DbContext
    {
        public SqlServerRealEstateContext(DbContextOptions<SqlServerRealEstateContext> options) : base(options)
        {
        }

        public DbSet<Certificate> Certificates { get; set; }
        public DbSet<Location> Locations { get; set; }
    }
}
