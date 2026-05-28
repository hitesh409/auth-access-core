import { PermissionFlags } from '../../authorization/constants/permission-flags.constants';
import { NavigationItem } from '../models/navigation-items.model';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'fa-solid fa-grid-2',
    route: '/dashboard',
  },

  {
    label: 'Administration',
    icon: 'fa-solid fa-user-shield',
    children: [
      {
        label: 'Users',
        route: '/admin/users',
        permissions: [
          {
            module: 'User Management',
            access: PermissionFlags.View,
          },
        ],
      },

      {
        label: 'Roles',
        route: '/admin/roles',
        permissions: [
          {
            module: 'Role Management',
            access: PermissionFlags.View,
          },
        ],
      },

      {
        label: 'Modules',
        route: '/admin/modules',
        permissions: [
          {
            module: 'Module Management',
            access: PermissionFlags.View,
          },
        ],
      },

      {
        label: 'Permissions',
        route: '/admin/permissions',
        permissions: [
          {
            module: 'Permission Management',
            access: PermissionFlags.View,
          },
        ],
      },
    ],
  },

  {
    label: 'Security',
    icon: 'fa-solid fa-shield-halved',
    children: [
      {
        label: 'Sessions',
        route: '/security/sessions',
        permissions: [
          {
            module: 'Session Management',
            access: PermissionFlags.View,
          },
        ],
      },

      {
        label: 'Access Policies',
        route: '/security/access-policies',
        permissions: [
          {
            module: 'Access Policies',
            access: PermissionFlags.View,
          },
        ],
      },

      {
        label: 'Token Activity',
        route: '/security/token-activity',
        permissions: [
          {
            module: 'Token Activity',
            access: PermissionFlags.View,
          },
        ],
      },

      {
        label: 'Device Activity',
        route: '/security/device-activity',
        permissions: [
          {
            module: 'Device Activity',
            access: PermissionFlags.View,
          },
        ],
      },
    ],
  },

  {
    label: 'Reports',
    icon: 'fa-solid fa-chart-column',
    children: [
      {
        label: 'Audit Logs',
        route: '/reports/audit-logs',
        permissions: [
          {
            module: 'Audit Logs',
            access: PermissionFlags.View,
          },
        ],
      },

      {
        label: 'Login Activity',
        route: '/reports/login-activity',
        permissions: [
          {
            module: 'Login Activity',
            access: PermissionFlags.View,
          },
        ],
      },
    ],
  },

  {
    label: 'Settings',
    icon: 'fa-solid fa-gear',
    children: [
      {
        label: 'Profile Settings',
        route: '/settings/profile-settings',
      },

      {
        label: 'Security Settings',
        route: '/settings/security-settings',
        permissions: [
          {
            module: 'Security Settings',
            access: PermissionFlags.View,
          },
        ],
      },
    ],
  },
];
