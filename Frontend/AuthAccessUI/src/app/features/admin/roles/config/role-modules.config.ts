import { PermissionGroup } from '../../../../shared/ui/components/permission-tree/permission-tree.model';

/** Grouped AppModules catalog used by the role permission tree. */
export const MODULE_GROUPS: PermissionGroup[] = [
  {
    name: 'Administration',
    modules: ['User Management', 'Role Management', 'Module Management', 'Permission Management'],
  },
  {
    name: 'Security',
    modules: ['Session Management', 'Access Policies', 'Token Activity', 'Device Activity'],
  },
  {
    name: 'Reports',
    modules: ['Audit Logs', 'Login Activity', 'Access Reports', 'Security Reports'],
  },
  {
    name: 'Settings',
    modules: ['Profile Settings', 'Security Settings', 'Application Settings'],
  },
  {
    name: 'Core',
    modules: ['Dashboard'],
  },
];
