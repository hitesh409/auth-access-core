export type ModuleCategory = 'Administration' | 'Security' | 'Reports' | 'Settings' | 'Core';
export type ModuleStatus = 'Active' | 'Inactive';

export interface ModuleRoleGrant {
  roleName: string;
  roleType: 'System' | 'Custom';
  accessRights: number;
}

export interface AppModuleDemo {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  routePath: string;
  status: ModuleStatus;
  /** Rights granted to a role by default when access is first configured. */
  defaultAccessRights: number;
  /** Which access-right flags are configurable at all for this module. */
  availableAccessRights: number;
  rolesGranted: ModuleRoleGrant[];
  auditEvents: string[];
}
