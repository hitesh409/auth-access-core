import { PermissionFlags } from '../constants/permission-flags.constants';

/** Decode a bitwise access-rights value into readable labels. */
export function decodeAccessRights(flags: number): string {
  if (flags === PermissionFlags.None) {
    return 'No Access';
  }

  const labels: string[] = [];
  if (flags & PermissionFlags.View) labels.push('View');
  if (flags & PermissionFlags.Create) labels.push('Create');
  if (flags & PermissionFlags.Update) labels.push('Update');
  if (flags & PermissionFlags.Delete) labels.push('Delete');
  if (flags & PermissionFlags.Export) labels.push('Export');
  return labels.join(', ');
}

/** Number of individual flags set in a bitwise access-rights value. */
export function countAccessRights(value: number): number {
  let count = 0;
  let bits = value;
  while (bits) {
    count += bits & 1;
    bits >>= 1;
  }
  return count;
}
