import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../../../core/navigation/navigation.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly layoutService = inject(LayoutService);
  private readonly navigationService = inject(NavigationService);
  readonly navigationItems = this.navigationService.filteredItems;
  readonly isSidebarCollapsed = this.layoutService.isSidebarCollapsed;
}
