using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Models
{
    public class Location
    {
        public int ID { get; set; }

        public int Order { get; set; }

        public float LatitudeY { get; set; }

        public float LongitudeX { get; set; }

        public int CertificateID { get; set; }

        public Certificate Certificate { get; set; }
    }
}
