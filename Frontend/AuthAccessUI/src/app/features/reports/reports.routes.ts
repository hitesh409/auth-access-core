import { Routes } from '@angular/router';

import { PermissionFlags } from '../../core/authorization/constants/permission-flags.constants';

export const REPORTS_ROUTES: Routes = [
  {
    path: 'audit-logs',
    data: {
      permission: {
        module: 'Audit Logs',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./audit-logs/audit-logs').then((m) => m.AuditLogs),
  },
  
  {
    path: 'login-activity',
    data: {
      permission: {
        module: 'Login Activity',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./login-activity/login-activity').then((m) => m.LoginActivity),
  },

  {
    path: 'access-reports',
    data: {
      permission: {
        module: 'Access Reports',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () => import('./access-reports/access-reports').then((m) => m.AccessReports),
  },

  {
    path: 'security-reports',
    data: {
      permission: {
        module: 'Security Reports',
        access: PermissionFlags.View,
      },
    },
    loadComponent: () =>
      import('./security-reports/security-reports').then((m) => m.SecurityReports),
  },
];
