import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { NavigationItem } from './models/navigation-items.model';
import { NAVIGATION_ITEMS } from './config/navigation-items.config';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly authorizationService = inject(AuthorizationService);
  readonly navigationItems = computed(() =>
    this.filterNavigation(structuredClone(NAVIGATION_ITEMS)),
  );

  private filterNavigation(items: NavigationItem[]): NavigationItem[] {
    return items
      .map((item) => ({
        ...item,
        children: item.children ? this.filterNavigation(item.children) : undefined,
      }))
      .filter((item) => {
        if (item.children?.length) {
          return true;
        }
        if (!item.permissions?.length) {
          return true;
        }
        return item.permissions.every((permission) =>
          this.authorizationService.hasPermission(permission.module, permission.access),
        );
      });
  }
}
