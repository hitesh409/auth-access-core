import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { NavigationService } from '../../../../core/navigation/navigation.service';
import { LayoutService } from '../../../../core/layout/layout.service';
import { NavigationOverlayService } from '../../../../core/navigation/navigation-overlay.service';
import { NavigationItem } from '../../../../core/navigation/models/navigation-items.model';
import { ButtonComponent } from '../../../../shared/ui/components/button/button';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, ButtonComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly router = inject(Router);
  readonly layoutService = inject(LayoutService);
  readonly navigationService = inject(NavigationService);
  readonly overlayService = inject(NavigationOverlayService);

  protected readonly faArrowLeft = faArrowLeft;
  readonly navigationItems = this.navigationService.navigationItems;
  readonly isMobileView = this.layoutService.isMobileView;
  readonly isMobileSidebarOpen = this.layoutService.isMobileSidebarOpen;
  readonly mobileParent = this.layoutService.mobileParent;

  constructor() {}

  openOverlay(event: MouseEvent, item: NavigationItem): void {
    this.openNavigation(event, item);
  }

  isParentActive(item: NavigationItem): boolean {
    const currentUrl = this.router.url;
    return (
      item.children?.some((child) => child.route && currentUrl.startsWith(child.route)) ?? false
    );
  }

  openNavigation(event: MouseEvent, item: NavigationItem): void {
    if (this.isMobileView()) {
      this.overlayService.close();
      this.layoutService.openMobileChildren(item);
      return;
    }
    const anchor = event.currentTarget as HTMLElement;
    this.overlayService.toggle(item, anchor);
  }

  navigateMobile(): void {
    if (this.isMobileView()) {
      this.layoutService.closeMobileSidebar();
    }
  }

  backToMainNavigation(): void {
    this.layoutService.closeMobileChildren();
  }
}
