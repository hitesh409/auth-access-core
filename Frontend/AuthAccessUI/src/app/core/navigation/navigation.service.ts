import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthorizationService } from '../authorization/authorization.service';
import { NavigationItem } from './models/navigation-items.model';
import { NAVIGATION_ITEMS } from './config/navigation-items.config';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly authoRizationService = inject(AuthorizationService);
  private readonly items = signal<NavigationItem[]>(NAVIGATION_ITEMS);

  readonly filteredItems = computed(() => this.filterItems(this.items()));

  private filterItems(items: NavigationItem[]): NavigationItem[] {
    return items
      .map((item) => {
        //  Recursive child filtering
        const filteredChildren = item.children ? this.filterItems(item.children) : undefined;
        //  Validate permissions
        const hasPermission =
          !item.permissions ||
          item.permissions.every((permission) =>
            this.authoRizationService.hasPermission(permission.module, permission.access),
          );
        // Parent visible if: - authorized - OR contains visible children
        const shouldDisplay = hasPermission || (filteredChildren && filteredChildren.length > 0);

        if (!shouldDisplay) return null;
        return {
          ...item,
          children: filteredChildren,
        };
      })
      .filter(Boolean) as NavigationItem[];
  }
}
