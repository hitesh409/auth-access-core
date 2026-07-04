import { countAccessRights } from '../../../core/authorization/utils/access-rights.util';
import { AppModuleDemo } from './app-module.model';

/** Number of roles currently granted any access to this module. */
export function rolesGrantedCount(module: AppModuleDemo): number {
  return module.rolesGranted.length;
}

/** Number of individual access-right flags configurable for this module. */
export function availableRightsCount(module: AppModuleDemo): number {
  return countAccessRights(module.availableAccessRights);
}
