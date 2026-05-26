import { Routes } from '@angular/router';

import { PermissionFlags } from '../../core/authorization/constants/permission-flags.constants';

export const SETTINGS_ROUTES: Routes = [
  {
    path: 'profile',
    data: {
      permission: {
        module: 'Profile Settings',
        access: PermissionFlags.Update,
      },
    },
    loadComponent: () => import('./profile/profile').then((m) => m.Profile),
  },

  {
    path: 'security',
    data: {
      permission: {
        module: 'Security Settings',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () =>
      import('./security-settings/security-settings').then((m) => m.SecuritySettings),
  },

  {
    path: 'application',
    data: {
      permission: {
        module: 'Application Settings',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () =>
      import('./application-settings/application-settings').then((m) => m.ApplicationSettings),
  },
];
