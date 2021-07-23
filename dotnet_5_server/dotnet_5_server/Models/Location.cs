using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Models
{
    public class Location
    {
        public int ID { get; set; }

        [Required]
        public int Order { get; set; }

        [Required]
        public float LatitudeY { get; set; }

        [Required]
        public float LongitudeX { get; set; }

        public int CertificateID { get; set; }

        public Certificate Certificate { get; set; }
    }
}
