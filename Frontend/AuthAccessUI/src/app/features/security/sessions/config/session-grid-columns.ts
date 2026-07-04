import { GridColumn } from '../../../../shared/ui/components/data-grid/models/grid-column.model';
import { SessionDemo } from '../session-demo.model';

export const SESSION_GRID_COLUMNS: GridColumn<SessionDemo>[] = [
  { key: 'userName', header: 'User', sortable: true },
  { key: 'device', header: 'Device', sortable: true },
  { key: 'ipAddress', header: 'IP Address', sortable: false },
  { key: 'location', header: 'Location', sortable: true },
  {
    key: 'status',
    header: 'Status',
    type: 'badge',
    sortable: true,
    badgeVariant: (row) => {
      switch (row.status) {
        case 'Active':
          return 'success';
        case 'Expired':
          return 'warning';
        default:
          return 'neutral';
      }
    },
  },
  { key: 'lastActivityAt', header: 'Last Activity', sortable: true },
];
