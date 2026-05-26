import { Routes } from '@angular/router';

import { PermissionFlags } from '../../core/authorization/constants/permission-flags.constants';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    data: {
      permission: {
        module: 'Dashboard',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./dashboard').then((m) => m.Dashboard),
  },
];
