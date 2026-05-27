import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';
import { RoutePermission } from '../authorization/models/route-permission.model';

export const permissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);

  const permissions = route.data['permissions'] as RoutePermission[] | undefined;

  if (!permissions || permissions.length === 0) return true;

  const hasAccess = permissions.every((permission) =>
    authorizationService.hasPermission(permission.module, permission.access),
  );
  if (hasAccess) return true;
  return router.createUrlTree(['/unauthorized']);
};
