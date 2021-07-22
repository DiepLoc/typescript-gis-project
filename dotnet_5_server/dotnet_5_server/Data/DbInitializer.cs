using dotnet_5_server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(SqlServerRealEstateContext context)
        {
            if (context.Certificates.Any())
            {
                return;   // DB has been seeded
            }

            var certificates = new Certificate[]
            {
                new Certificate{Address = "Some Address", LandParcel = 266, MapSheet=7, Acreage=300F, OwnerName="new Owner"}
            };
            foreach (Certificate c in certificates)
            {
                context.Certificates.Add(c);
            }
            context.SaveChanges();

            var locations = new Location[]
            {
            new Location{ Order = 1, CertificateID = 1, LatitudeY = 20000F, LongitudeX = 200000.5F},
            new Location{ Order = 2, CertificateID = 1, LatitudeY = 20001F, LongitudeX = 200001.5F},
            };
            foreach (Location c in locations)
            {
                context.Locations.Add(c);
            }
            context.SaveChanges();
        }
    }
}
