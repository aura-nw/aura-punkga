import { Paging } from 'components';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'constants/pagination';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface LoadDataResponse {
  total: number;
  data: any[];
}

export interface Sort {
  field: string;
  order: 'descend' | 'ascend';
}

export interface LoadDataFnc {
  (params: Paging, sort?: Sort, ...args: any): Promise<LoadDataResponse>;
}
interface UsePaginationOptions extends Partial<LoadDataResponse> {
  defaultPageSize?: number;
  defaultSort?: Sort;
  loadData?: LoadDataFnc;
}
interface UsePaginationOutput extends LoadDataResponse {
  page: number;
  pageSize: number;
  loading: boolean;
  sort?: Sort;
  onPageChange: (paging: Paging) => void;
  onSortChange: (sort: Sort) => void;
  load: (...args: any) => void;
}

interface UsePagination {
  (options: UsePaginationOptions): UsePaginationOutput;
}

export const usePagination: UsePagination = ({
  defaultPageSize,
  defaultSort,
  data: dataOpt,
  total: totalOpt,
  loadData
}) => {
  const keepRef = useRef({ loadData });
  keepRef.current.loadData = loadData;

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [sort, setSort] = useState<Sort | undefined>(defaultSort);
  const [pageSize, setPageSize] = useState(
    defaultPageSize || DEFAULT_PAGE_SIZE
  );
  const [loading, setLoading] = useState(!!loadData);

  const [data, setData] = useState(dataOpt || []);
  const [total, setTotal] = useState(totalOpt || 0);

  const load = useCallback(
    async (...args: any) => {
      if (!keepRef.current.loadData) return;

      setLoading(true);
      try {
        const { data, total } = await keepRef.current.loadData(
          {
            page,
            pageSize
          },
          sort,
          ...args
        );
        setData(data);
        setTotal(total);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    },
    [page, pageSize, sort]
  );

  useEffect(() => {
    load();
  }, [load]);

  const onPageChange = useCallback(({ page, pageSize }: Paging) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  const onSortChange = useCallback((_sort: Sort) => {
    setSort(_sort);
  }, []);

  return useMemo(
    () => ({
      page,
      pageSize,
      sort,
      loading,
      data,
      total,
      onPageChange,
      onSortChange,
      load
    }),
    [
      page,
      pageSize,
      sort,
      loading,
      data,
      total,
      onPageChange,
      onSortChange,
      load
    ]
  );
};
