import { GridColumn } from '../../../../shared/ui/components/data-grid/models/grid-column.model';
import { SessionDemo } from '../session-demo.model';
import { formatDateTime } from '../session.util';

export const SESSION_GRID_COLUMNS: GridColumn<SessionDemo>[] = [
  { key: 'userName', header: 'User', sortable: true, width: '150px' },
  { key: 'device', header: 'Device', sortable: true, width: '190px' },
  { key: 'ipAddress', header: 'IP Address', sortable: false, width: '130px' },
  { key: 'location', header: 'Location', sortable: true, width: '150px' },
  {
    key: 'status',
    header: 'Status',
    type: 'badge',
    sortable: true,
    width: '110px',
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
  {
    key: 'lastActivityAt',
    header: 'Last Activity',
    sortable: true,
    width: '170px',
    formatter: (row) => formatDateTime(row.lastActivityAt),
  },
];
