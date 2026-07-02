import { EntityNavigatorTemplate } from '../../../../shared/ui/entity-navigator/entity-navigator-template.model';
import { UserDemo } from '../user-demo.model';

export const USER_NAVIGATOR_TEMPLATE: EntityNavigatorTemplate<UserDemo> = {
  entityLabel: 'Users',
  filters: [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Locked', value: 'locked' },
    { label: 'Pending', value: 'pending' },
  ],
  avatar: (user) => `${user.firstName[0]}${user.lastName[0]}`,
  title: (user) => user.displayName,
  subtitle: (user) => user.roleName,
  status: (user) => user.status,
  statusVariant: (user) => {
    switch (user.status) {
      case 'Active':
        return 'success';
      case 'Locked':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'neutral';
    }
  },
};
