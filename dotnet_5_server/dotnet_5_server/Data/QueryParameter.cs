using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Data
{
    public class QueryParameter
    {
        public enum SortByEnum
        {
           ID,
           LandParcel,
           MapSheet,
           Acreage,
           OwnerName,
        }

        public int PageSize { get; set; } = 10;

        public int Page { get; set; } = 1;

        public int Offset { get; set; } = 0;

        public SortByEnum SortBy { get; set; } = SortByEnum.ID;

        public void Deconstruct(out int pageSize, out int page, out int offset)
        {
            pageSize = this.PageSize;
            page = this.Page;
            offset = this.Offset;
        }
    }
}
