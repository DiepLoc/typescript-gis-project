using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Models
{
    public class Certificate
    {
        public int ID { get; set; }

        public string Address { get; set; }

        public int LandParcel { get; set; }

        public int MapSheet { get; set; }

        public float Acreage { get; set; }

        public string OwnerName { get; set; }

        public ICollection<Location> Locations { get; set; }
    }
}
