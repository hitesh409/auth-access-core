import { APP_ICONS } from '../../../shared/icons/font-awesome.icons';
import { PermissionFlags } from '../../authorization/constants/permission-flags.constants';
import { NavigationItem } from '../models/navigation-items.model';


export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 0,
    label: 'Dashboard',
    icon: APP_ICONS.home,
    route: '/dashboard',
  },

  {
    id: 1,
    label: 'Administration',
    icon: APP_ICONS.userShield,
    children: [
      {
        id: 1001,
        label: 'Users',
        icon: APP_ICONS.users,
        route: '/admin/users',
        permissions: [
          {
            module: 'User Management',
            access: PermissionFlags.View,
          },
        ],
      },
      {
        id: 1002, 
        label: 'Roles',
        icon: APP_ICONS.roles,
        route: '/admin/roles',
        permissions: [
          {
            module: 'Role Management',
            access: PermissionFlags.View,
          },
        ],
      },
      {
        id: 1003,
        label: 'Modules',
        icon : APP_ICONS.modules,
        route: '/admin/modules',
        permissions: [
          {
            module: 'Module Management',
            access: PermissionFlags.View,
          },
        ],
      },
      { 
        id: 1004,
        label: 'Permissions',
        icon: APP_ICONS.permission,
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
    id: 2,
    label: 'Security',
    icon: APP_ICONS.security,
    children: [
      {
        id: 2001,
        label: 'Sessions',
        icon: APP_ICONS.sessions,
        route: '/security/sessions',
        permissions: [
          {
            module: 'Session Management',
            access: PermissionFlags.View,
          },
        ],
      },
      {
        id: 2002,
        label: 'Access Policies',
        icon: APP_ICONS.policies,
        route: '/security/access-policies',
        permissions: [
          {
            module: 'Access Reports',
            access: PermissionFlags.View,
          },
        ],
      },
      {
        id: 2003,
        label: 'Token Activity',
        icon: APP_ICONS.key,
        route: '/security/token-activity',
        permissions: [
          {
            module: 'Token Activity',
            access: PermissionFlags.View,
          },
        ],
      },
      {
        id: 2004, 
        label: 'Device Activity',
        icon: APP_ICONS.device,
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
    id: 3,
    label: 'Reports',
    icon: APP_ICONS.chart,
    children: [
      {
        id: 3001,
        label: 'Audit Logs',
        icon: APP_ICONS.audit,
        route: '/reports/audit-logs',
        permissions: [
          {
            module: 'Audit Logs',
            access: PermissionFlags.View,
          },
        ],
      },
      {
        id: 3002,
        label: 'Login Activity',
        icon: APP_ICONS.signin,
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
    id: 4,
    label: 'Settings',
    icon: APP_ICONS.settings,
    children: [
      {
        id: 4001,
        label: 'Profile Settings',
        icon: APP_ICONS.profile,
        route: '/settings/profile',
      },
      {
        id: 4002,
        label: 'Security Settings',
        icon: APP_ICONS.lock,
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