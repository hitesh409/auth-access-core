import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { NAVIGATION_ITEMS } from '../../config/navigation.config';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../../../core/navigation/navigation.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly layoutService = inject(LayoutService);
  private readonly navigationService = inject(NavigationService);
  readonly navigationItems = this.navigationService.filteredItems;
  readonly isSidebarCollapsed = this.layoutService.isSidebarCollapsed;
}
