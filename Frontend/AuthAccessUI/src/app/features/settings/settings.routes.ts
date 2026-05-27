import { Routes } from '@angular/router';

import { PermissionFlags } from '../../core/authorization/constants/permission-flags.constants';
import { permissionGuard } from '../../core/guards/permissions.guard';

export const SETTINGS_ROUTES: Routes = [
  {
    path: 'profile',
    canActivate: [permissionGuard],
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
    canActivate: [permissionGuard],
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
    canActivate: [permissionGuard],
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
