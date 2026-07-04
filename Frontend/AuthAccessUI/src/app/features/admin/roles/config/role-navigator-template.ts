import { EntityNavigatorTemplate } from '../../../../shared/ui/entity-navigator/entity-navigator-template.model';
import { RoleDemo } from '../role-demo.model';
import { moduleCount, permissionCount } from '../role.util';

export const ROLE_NAVIGATOR_TEMPLATE: EntityNavigatorTemplate<RoleDemo> = {
  entityLabel: 'Roles',
  filters: [
    { label: 'All', value: 'all' },
    { label: 'System', value: 'system' },
    { label: 'Custom', value: 'custom' },
  ],
  avatar: (role) =>
    role.name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join(''),
  title: (role) => role.name,
  subtitle: (role) => role.description,
  status: (role) => role.type,
  statusVariant: (role) => (role.type === 'System' ? 'info' : 'neutral'),
  metadata: (role) => [
    { label: 'users', value: role.usersAssigned },
    { label: 'permissions', value: permissionCount(role) },
    { label: 'modules', value: moduleCount(role) },
  ],
};
