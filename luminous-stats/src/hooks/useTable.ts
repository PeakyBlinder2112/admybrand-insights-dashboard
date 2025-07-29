import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface UseTableOptions<T> {
  data: T[];
  initialSort?: { key: keyof T; direction: SortDirection };
  filterFn?: (item: T) => boolean;
  pageSize?: number;
}

export interface UseTableResult<T> {
  pageData: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  setPage: (page: number) => void;
  sortKey: keyof T | null;
  sortDirection: SortDirection;
  setSort: (key: keyof T) => void;
  setFilterFn: (fn: (item: T) => boolean) => void;
}

export function useTable<T>({
  data,
  initialSort,
  filterFn: initialFilterFn,
  pageSize: initialPageSize = 10,
}: UseTableOptions<T>): UseTableResult<T> {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [sortKey, setSortKey] = useState<keyof T | null>(initialSort?.key ?? null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSort?.direction ?? 'asc');
  const [filterFn, setFilterFn] = useState<(item: T) => boolean>(() => initialFilterFn || (() => true));

  const sortedFiltered = useMemo(() => {
    // Ensure filterFn is always a function
    const safeFilterFn = typeof filterFn === 'function' ? filterFn : (() => true);
    let filtered = data.filter(safeFilterFn);
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, filterFn, sortKey, sortDirection]);

  const total = sortedFiltered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedFiltered.slice(start, start + pageSize);
  }, [sortedFiltered, page, pageSize]);

  const setSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setPage(1);
  };

  return {
    pageData,
    page,
    pageSize,
    total,
    totalPages,
    setPage,
    sortKey,
    sortDirection,
    setSort,
    setFilterFn,
  };
} 