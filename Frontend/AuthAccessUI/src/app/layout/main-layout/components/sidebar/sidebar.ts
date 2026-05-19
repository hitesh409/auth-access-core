import { Component, inject } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NAVIGATION_ITEMS } from '../../config/navigation.config';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly layoutService = inject(LayoutService);
  readonly navigationItems = NAVIGATION_ITEMS;
  readonly isSidebarCollapsed = this.layoutService.isSidebarCollapsed;
}
