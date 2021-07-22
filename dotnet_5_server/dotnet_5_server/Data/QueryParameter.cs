using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_5_server.Data
{
    public class QueryParameter
    {
        public int PageSize { get; set; } = 10;

        public int Page { get; set; } = 1;

        public void Deconstruct(out int pageSize, out int page)
        {
            pageSize = this.PageSize;
            page = this.Page;
        }
    }
}
