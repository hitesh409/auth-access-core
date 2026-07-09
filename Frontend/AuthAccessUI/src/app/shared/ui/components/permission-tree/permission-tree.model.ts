/** A right (flag) that can be toggled on a module. `bit` is a bitmask value. */
export interface PermissionTreeFlag {
  key: string;
  label: string;
  short: string;
  bit: number;
  description: string;
}

/** A module node in the tree. */
export interface PermissionTreeModule {
  key: string;
  name: string;
  category: string;
  description: string;
}
