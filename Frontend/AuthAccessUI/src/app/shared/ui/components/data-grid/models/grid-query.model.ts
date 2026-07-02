export interface GridQuery {
  page: number;
  pageSize: number;
  search: string;
  sortColumn: string | null;
  sortDirection: SortDirection;
}

type SortDirection = 'asc' | 'desc' | null;
