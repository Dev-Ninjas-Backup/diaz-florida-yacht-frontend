import { useState } from 'react';

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UsePaginationParams {
  initialPage?: number;
  initialLimit?: number;
}

export interface UsePaginationReturn {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: (totalPages: number) => void;
  canGoNext: (totalPages: number) => boolean;
  canGoPrev: () => boolean;
  resetPagination: () => void;
}

export const usePagination = ({
  initialPage = 1,
  initialLimit = 10,
}: UsePaginationParams = {}): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = (totalPages: number) => {
    setPage(totalPages);
  };

  const canGoNext = (totalPages: number) => {
    return page < totalPages;
  };

  const canGoPrev = () => {
    return page > 1;
  };

  const resetPagination = () => {
    setPage(initialPage);
    setLimit(initialLimit);
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    canGoNext,
    canGoPrev,
    resetPagination,
  };
};
