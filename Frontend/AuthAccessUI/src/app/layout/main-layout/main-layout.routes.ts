import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('../../features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },

      {
        path: 'admin',
        loadChildren: () =>
          import('../../features/admin/admin.routes').then(
            (m) => m.ADMINISTRATION_ROUTES,
          ),
      },

      {
        path: 'security',
        loadChildren: () =>
          import('../../features/security/security.routes').then((m) => m.SECURITY_ROUTES),
      },

      {
        path: 'reports',
        loadChildren: () =>
          import('../../features/reports/reports.routes').then((m) => m.REPORTS_ROUTES),
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('../../features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
      },
    ],
  },
];
