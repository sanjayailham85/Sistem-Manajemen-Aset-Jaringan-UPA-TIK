import { useEffect, useState } from "react";

/**
 * @param {Function} fetchFunction - function API (page, limit) => response
 * @param {number} initialLimit
 */
const usePagination = (fetchFunction, initialLimit = 10) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);

  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (currentPage = page) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchFunction(currentPage, limit);

      setData(res.data || []);
      setPage(res.page || currentPage);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const nextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const refresh = () => {
    fetchData(page);
  };

  return {
    data,
    page,
    limit,
    totalPages,
    total,
    loading,
    error,
    setPage,
    nextPage,
    prevPage,
    goToPage,
    refresh,
  };
};

export default usePagination;
