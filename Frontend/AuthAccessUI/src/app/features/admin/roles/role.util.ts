import { countAccessRights } from '../../../core/authorization/utils/access-rights.util';
import { RoleDemo, RoleRight } from './role-demo.model';

/** Build an editable module -> access-rights map from a role's rights. */
export function rightsToMap(role: RoleDemo | null): Record<string, number> {
  const map: Record<string, number> = {};
  for (const right of role?.rights ?? []) {
    if (!right.isDeleted) {
      map[right.module] = right.allowedAccessRights;
    }
  }
  return map;
}

/** Rebuild RoleRight[] from an edited module -> access-rights map. */
export function mapToRights(map: Record<string, number>, base?: RoleDemo | null): RoleRight[] {
  const now = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const existing = new Map((base?.rights ?? []).map((r) => [r.module, r]));

  return Object.entries(map)
    .filter(([, flags]) => flags > 0)
    .map(([module, flags]) => {
      const prev = existing.get(module);
      return {
        module,
        allowedAccessRights: flags,
        createdBy: prev?.createdBy ?? 'You',
        createdOn: prev?.createdOn ?? now,
        isDeleted: false,
        updatedBy: 'You',
        updatedOn: now,
      };
    });
}

/** Non-deleted rights that grant at least one access flag. */
export function activeRights(role: RoleDemo): RoleRight[] {
  return role.rights.filter((r) => !r.isDeleted && r.allowedAccessRights > 0);
}

/** Number of modules the role can access. */
export function moduleCount(role: RoleDemo): number {
  return activeRights(role).length;
}

/** Total individual access rights granted across all modules. */
export function permissionCount(role: RoleDemo): number {
  return activeRights(role).reduce((sum, r) => sum + countAccessRights(r.allowedAccessRights), 0);
}
