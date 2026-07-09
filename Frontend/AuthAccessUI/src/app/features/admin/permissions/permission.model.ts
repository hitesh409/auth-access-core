export interface PermissionFlagDef {
  key: string;
  label: string;
  short: string;
  bit: number;
  description: string;
}

export interface PermissionModule {
  key: string;
  name: string;
  category: string;
  description: string;
}

export interface PermissionSubject {
  id: string;
  name: string;
  email: string;
  role: string;
  accessMode: 'Role Based' | 'Custom';
  initials: string;
}

export type PermissionValue = Record<string, number>;
