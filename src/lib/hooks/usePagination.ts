import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  initialLimit?: number;
  limitOptions?: number[];
}

export function usePagination({
  totalItems,
  initialPage = 1,
  initialLimit = 10,
  limitOptions = [5, 10, 20, 50, 100],
}: UsePaginationProps) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const goToNextPage = () => goToPage(page + 1);
  const goToPreviousPage = () => goToPage(page - 1);

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const paginationInfo = {
    currentPage: page,
    totalPages,
    limit,
    startIndex,
    endIndex,
    totalItems,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    ...paginationInfo,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    changeLimit,
    limitOptions,
  };
}
