import { PermissionTreeModule } from '../../../../shared/ui/components/permission-tree/permission-tree.model';

/** AppModules catalog (grouped by category) used by the role permission tree. */
export const MODULE_GROUPS: PermissionTreeModule[] = [
  // Administration
  { key: 'User Management', name: 'User Management', category: 'Administration', description: 'Accounts, profiles, and account status.' },
  { key: 'Role Management', name: 'Role Management', category: 'Administration', description: 'Roles and the rights bundled into them.' },
  { key: 'Module Management', name: 'Module Management', category: 'Administration', description: 'The catalog of protectable modules.' },
  { key: 'Permission Management', name: 'Permission Management', category: 'Administration', description: 'Assigning rights to users and roles.' },

  // Security
  { key: 'Session Management', name: 'Session Management', category: 'Security', description: 'Active sign-in sessions and revocation.' },
  { key: 'Access Policies', name: 'Access Policies', category: 'Security', description: 'Conditional access and policy rules.' },
  { key: 'Token Activity', name: 'Token Activity', category: 'Security', description: 'Issued tokens, scopes, and usage.' },
  { key: 'Device Activity', name: 'Device Activity', category: 'Security', description: 'Registered devices and trust status.' },

  // Reports
  { key: 'Audit Logs', name: 'Audit Logs', category: 'Reports', description: 'Immutable record of system changes.' },
  { key: 'Login Activity', name: 'Login Activity', category: 'Reports', description: 'Sign-in attempts and outcomes.' },
  { key: 'Access Reports', name: 'Access Reports', category: 'Reports', description: 'Who can access what, summarized.' },
  { key: 'Security Reports', name: 'Security Reports', category: 'Reports', description: 'Security posture and incident reporting.' },

  // Settings
  { key: 'Profile Settings', name: 'Profile Settings', category: 'Settings', description: 'Personal profile and preferences.' },
  { key: 'Security Settings', name: 'Security Settings', category: 'Settings', description: 'Org-wide security and authentication policy.' },
  { key: 'Application Settings', name: 'Application Settings', category: 'Settings', description: 'System-wide application configuration.' },

  // Core
  { key: 'Dashboard', name: 'Dashboard', category: 'Core', description: 'Landing overview and key metrics.' },
];
