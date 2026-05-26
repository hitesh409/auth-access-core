import { Routes } from '@angular/router';

import { PermissionFlags } from '../../core/authorization/constants/permission-flags.constants';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: 'users',
    data: {
      permission: {
        module: 'User Management',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./users/users').then((m) => m.Users),
  },

  {
    path: 'roles',
    data: {
      permission: {
        module: 'Role Management',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./roles/roles').then((m) => m.Roles),
  },

  {
    path: 'modules',
    data: {
      permission: {
        module: 'Module Management',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./modules/modules').then((m) => m.Modules),
  },

  {
    path: 'permissions',
    data: {
      permission: {
        module: 'Permission Management',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./permissions/permissions').then((m) => m.Permissions),
  },
];
