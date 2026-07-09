import { GridColumn } from '../../../../shared/ui/components/data-grid/models/grid-column.model';
import { DeviceDemo } from '../device-demo.model';
import { formatDateTime } from '../device.util';

export const DEVICE_GRID_COLUMNS: GridColumn<DeviceDemo>[] = [
  { key: 'deviceName', header: 'Device', sortable: true, width: '190px' },
  { key: 'owner', header: 'Owner', sortable: true, width: '150px' },
  {
    key: 'type',
    header: 'Type',
    type: 'badge',
    sortable: true,
    width: '110px',
    badgeVariant: (row) => (row.type === 'Desktop' ? 'info' : 'neutral'),
  },
  { key: 'os', header: 'Operating System', sortable: true, width: '160px' },
  { key: 'location', header: 'Location', sortable: true, width: '150px' },
  {
    key: 'status',
    header: 'Status',
    type: 'badge',
    sortable: true,
    width: '120px',
    badgeVariant: (row) => {
      switch (row.status) {
        case 'Trusted':
          return 'success';
        case 'Pending':
          return 'warning';
        default:
          return 'error';
      }
    },
  },
  {
    key: 'lastSeenAt',
    header: 'Last Seen',
    sortable: true,
    width: '170px',
    formatter: (row) => formatDateTime(row.lastSeenAt),
  },
];
