import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavigationService } from '../../../../core/navigation/navigation.service';
import { LayoutService } from '../../../../core/layout/layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly layoutService = inject(LayoutService);
  readonly navigationService = inject(NavigationService);
  readonly navigationItems = this.navigationService.navigationItems;
  readonly isMobileView = this.layoutService.isMobileView;
  readonly isMobileSidebarOpen = this.layoutService.isMobileSidebarOpen;
  readonly expandedGroups = signal<string[]>([]);

  constructor() {
    const defaultExpandedGroups = this.navigationItems()
      .filter((item) => item.children)
      .map((item) => item.label);
    this.expandedGroups.set(defaultExpandedGroups);
  }

  isExpanded(label: string): boolean {
    return this.expandedGroups().includes(label);
  }

  toggleGroup(label: string): void {
    this.expandedGroups.update((groups) => {
      if (groups.includes(label)) {
        return groups.filter((group) => group !== label);
      } else {
        return [...groups, label];
      }
    });
  }
}
