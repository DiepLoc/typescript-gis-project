import React, { useEffect, useMemo, useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const setSync = (page: number, size: number, total: number) => {
    setPage(page);
    setPageSize(size);
    setTotal(total);
  };

  const paginationConfig = useMemo(
    () => ({
      current: page,
      pageSize: pageSize,
      total: total,
      onChange: (num: number) => setPage(num),
    }),
    [page, pageSize, total, setPage]
  );

  return [
    { page, pageSize, total },
    {
      setPage,
      setPageSize,
      setTotal,
      setSync,
    },
    paginationConfig,
  ];
};

export default usePagination;
