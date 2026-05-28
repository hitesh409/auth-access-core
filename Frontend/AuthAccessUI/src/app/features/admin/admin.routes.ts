import { Routes } from '@angular/router';

import { PermissionFlags } from '../../core/authorization/constants/permission-flags.constants';
import { permissionGuard } from '../../core/guards/permissions.guard';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: 'users',
    canActivate: [permissionGuard],
    data: {
      permission: [
        {
          module: 'User Management',
          access: PermissionFlags.View,
        },
      ],
    },
    loadComponent: () => import('./users/users').then((m) => m.Users),
  },

  {
    path: 'roles',
    canActivate: [permissionGuard],
    data: {
      permission: [
        {
          module: 'Role Management',
          access: PermissionFlags.View,
        },
      ],
    },
    loadComponent: () => import('./roles/roles').then((m) => m.Roles),
  },

  {
    path: 'modules',
    canActivate: [permissionGuard],
    data: {
      permission: [
        {
          module: 'Module Management',
          access: PermissionFlags.View,
        },
      ],
    },
    loadComponent: () => import('./modules/modules').then((m) => m.Modules),
  },

  {
    path: 'permissions',
    canActivate: [permissionGuard],
    data: {
      permission: [
        {
          module: 'Permission Management',
          access: PermissionFlags.View,
        },
      ],
    },
    loadComponent: () => import('./permissions/permissions').then((m) => m.Permissions),
  },
];
