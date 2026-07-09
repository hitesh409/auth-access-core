import { GridColumn } from '../../../../shared/ui/components/data-grid/models/grid-column.model';
import { TokenDemo } from '../token-demo.model';
import { formatDateTime } from '../token.util';

export const TOKEN_GRID_COLUMNS: GridColumn<TokenDemo>[] = [
  { key: 'name', header: 'Token', sortable: true, width: '200px' },
  {
    key: 'type',
    header: 'Type',
    type: 'badge',
    sortable: true,
    width: '150px',
    badgeVariant: (row) => {
      switch (row.type) {
        case 'Access':
          return 'info';
        case 'API Key':
          return 'warning';
        default:
          return 'neutral';
      }
    },
  },
  { key: 'owner', header: 'Owner', sortable: true, width: '150px' },
  { key: 'client', header: 'Client', sortable: true, width: '160px' },
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
          return 'error';
      }
    },
  },
  {
    key: 'lastUsedAt',
    header: 'Last Used',
    sortable: true,
    width: '170px',
    formatter: (row) => formatDateTime(row.lastUsedAt),
  },
];
