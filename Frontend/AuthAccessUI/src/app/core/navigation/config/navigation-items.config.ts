import { PermissionFlags } from '../../authorization/constants/permission-flags.constants';
import { NavigationItem } from '../models/navigation-items.model';
import {
  faUserShield,
  faUsers,
  faUserTag,
  faCubes,
  faKey,
  faShieldHalved,
  faLaptop,
  faFileShield,
  faDesktop,
  faChartLine,
  faClipboardList,
  faRightToBracket,
  faGear,
  faLock,
  faUserCircle,
  faHome,
  faFingerprint,
} from '@fortawesome/free-solid-svg-icons';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 0,
    label: 'Dashboard',
    icon: faHome,
    route: '/dashboard',
  },

  {
    id: 1,
    label: 'Administration',
    icon: faUserShield,
    children: [
      {
        id: 1001,
        label: 'Users',
        icon: faUsers,
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
        icon: faUserTag,
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
        icon : faCubes,
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
        icon: faFingerprint,
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
    icon: faShieldHalved,
    children: [
      {
        id: 2001,
        label: 'Sessions',
        icon: faLaptop,
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
        icon: faFileShield,
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
        icon: faKey,
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
        icon: faDesktop,
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
    icon: faChartLine,
    children: [
      {
        id: 3001,
        label: 'Audit Logs',
        icon: faClipboardList,
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
        icon: faRightToBracket,
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
    icon: faGear,
    children: [
      {
        id: 4001,
        label: 'Profile Settings',
        icon: faUserCircle,
        route: '/settings/profile',
      },
      {
        id: 4002,
        label: 'Security Settings',
        icon: faLock,
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