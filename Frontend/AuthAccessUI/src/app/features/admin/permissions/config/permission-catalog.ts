import { PermissionModule } from '../permission.model';
export const PERMISSION_CATALOG: PermissionModule[] = [
  // Administration
  {
    key: 'User Management',
    name: 'User Management',
    category: 'Administration',
    description: 'Accounts, profiles, and account status.',
  },
  {
    key: 'Role Management',
    name: 'Role Management',
    category: 'Administration',
    description: 'Roles and the rights bundled into them.',
  },
  {
    key: 'Module Management',
    name: 'Module Management',
    category: 'Administration',
    description: 'The catalog of protectable modules.',
  },
  {
    key: 'Permission Management',
    name: 'Permission Management',
    category: 'Administration',
    description: 'Assigning rights to users and roles.',
  },

  // Security
  {
    key: 'Session Management',
    name: 'Session Management',
    category: 'Security',
    description: 'Active sign-in sessions and revocation.',
  },
  {
    key: 'Access Policies',
    name: 'Access Policies',
    category: 'Security',
    description: 'Conditional access and policy rules.',
  },
  {
    key: 'Token Activity',
    name: 'Token Activity',
    category: 'Security',
    description: 'Issued tokens, scopes, and usage.',
  },
  {
    key: 'Device Activity',
    name: 'Device Activity',
    category: 'Security',
    description: 'Registered devices and trust status.',
  },

  // Reports
  {
    key: 'Audit Logs',
    name: 'Audit Logs',
    category: 'Reports',
    description: 'Immutable record of system changes.',
  },
  {
    key: 'Login Activity',
    name: 'Login Activity',
    category: 'Reports',
    description: 'Sign-in attempts and outcomes.',
  },

  // Settings
  {
    key: 'Security Settings',
    name: 'Security Settings',
    category: 'Settings',
    description: 'Org-wide security and authentication policy.',
  },
];
