import { PermissionFlags } from '../../../../core/authorization/constants/permission-flags.constants';
import { PermissionTreeFlag } from './permission-tree.model';

/**
 * The canonical five rights every module grant can carry, in display order.
 * Shared so every consumer of the permission tree (Roles, Permissions, ...)
 * renders an identical set of toggles.
 */
export const PERMISSION_TREE_FLAGS: PermissionTreeFlag[] = [
  { key: 'view', label: 'View', short: 'V', bit: PermissionFlags.View, description: 'See records and open detail views in this module.' },
  { key: 'create', label: 'Create', short: 'C', bit: PermissionFlags.Create, description: 'Add new records to this module.' },
  { key: 'update', label: 'Update', short: 'U', bit: PermissionFlags.Update, description: 'Edit existing records in this module.' },
  { key: 'delete', label: 'Delete', short: 'D', bit: PermissionFlags.Delete, description: 'Remove records from this module.' },
  { key: 'export', label: 'Export', short: 'E', bit: PermissionFlags.Export, description: 'Download or export data from this module.' },
];

/** Bitmask with every flag granted — used for tri-state "grant all". */
export const ALL_PERMISSION_BITS = PERMISSION_TREE_FLAGS.reduce((acc, f) => acc | f.bit, 0);
