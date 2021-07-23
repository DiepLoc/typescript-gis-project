using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Models
{
    public class Certificate
    {
        public int ID { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public int LandParcel { get; set; }

        [Required]
        public int MapSheet { get; set; }

        [Required]
        public float Acreage { get; set; }

        [Required]
        public string OwnerName { get; set; }

        public ICollection<Location> Locations { get; set; }
    }
}
