import { Routes } from '@angular/router';

import { PermissionFlags } from '../../core/authorization/constants/permission-flags.constants';

export const SECURITY_ROUTES: Routes = [
  {
    path: 'sessions',
    data: {
      permission: {
        module: 'Session Management',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () =>
      import('./sessions/sessions').then((m) => m.Sessions),
  },

  {
    path: 'access-policies',
    data: {
      permission: {
        module: 'Access Policies',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () =>
      import('./access-policies/access-policies').then(
        (m) => m.AccessPolicies,
      ),
  },

  {
    path: 'token-activity',
    data: {
      permission: {
        module: 'Token Activity',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () =>
      import('./token-activity/token-activity').then(
        (m) => m.TokenActivity,
      ),
  },

  {
    path: 'device-activity',
    data: {
      permission: {
        module: 'Device Activity',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () =>
      import('./device-activity/device-activity').then(
        (m) => m.DeviceActivity,
      ),
  },
];
