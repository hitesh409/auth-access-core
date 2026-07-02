import { GridAction } from './grid-action.model';
export type GridColumnType = 'text' | 'badge' | 'date' | 'actions';
export interface GridColumn<T = any> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  hidden?: boolean;
  hideable?: boolean;
  type?: GridColumnType;
  formatter?: (row: T) => string;
  badgeVariant?: (row: T) => 'success' | 'warning' | 'error' | 'info' | 'neutral';
  actions?: GridAction<T>[];
}
