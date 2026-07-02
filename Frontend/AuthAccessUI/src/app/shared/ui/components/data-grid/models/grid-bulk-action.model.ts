export interface GridBulkAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  action: (selectedIds: string[]) => void;
}
