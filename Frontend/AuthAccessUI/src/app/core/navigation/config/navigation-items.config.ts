import { PermissionFlags } from '../../authorization/constants/permission-flags.constants';
import { NavigationItem } from '../models/navigation-items.model';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'bi bi-grid',
    route: '/dashboard',
  },

  {
    label: 'Administration',
    icon: 'bi bi-person-gear',
    children: [
      {
        label: 'Users',
        icon: 'bi bi-people',
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
        icon: ' bi bi-person-badge',
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
        icon : 'bi bi-boxes',
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
        icon: 'bi bi-shield-check',
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
    icon: 'bi bi-shield-lock',
    children: [
      {
        label: 'Sessions',
        icon: 'bi bi-clock-history',
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
        icon: 'bi bi-shield-exclamation',
        route: '/security/access-policies',
        permissions: [
          {
            module: 'Access Reports',
            access: PermissionFlags.View,
          },
        ],
      },
      {
        label: 'Token Activity',
        icon: 'bi bi-ticket-perforated',
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
        icon: 'bi bi-pc-display',
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
    icon: 'bi bi-bar-chart-line',
    children: [
      {
        label: 'Audit Logs',
        icon: 'bi bi-journal-text',
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
        icon: 'bi bi-box-arrow-in-right',
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
    icon: 'bi bi-gear',
    children: [
      {
        label: 'Profile Settings',
        icon: 'bi bi-person-circle',
        route: '/settings/profile',
      },
      {
        label: 'Security Settings',
        icon: 'bi bi-shield-lock',
        route: '/settings/security',
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