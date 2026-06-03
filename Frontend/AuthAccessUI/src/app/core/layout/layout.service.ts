import { Injectable, computed, signal } from '@angular/core';
import { MOBILE_BREAKPOINT } from './constants/layout.constants';
import { NavigationItem } from '../navigation/models/navigation-items.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly mobileParentSignal = signal<NavigationItem | null>(null);
  readonly mobileParent = this.mobileParentSignal.asReadonly();
  private readonly mobileSidebarOpenSignal = signal(false);
  private readonly mobileViewSignal = signal(window.innerWidth < MOBILE_BREAKPOINT);
  readonly isMobileSidebarOpen = computed(() => this.mobileSidebarOpenSignal());
  readonly isMobileView = computed(() => this.mobileViewSignal());

  constructor() {
    this.initializeResizeListener();
  }

  private initializeResizeListener(): void {
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      this.mobileViewSignal.set(isMobile);
      if (!isMobile) {
        this.mobileSidebarOpenSignal.set(false);
        this.mobileParentSignal.set(null);
      }
    });
  }

  toggleSidebar(): void {
    if (!this.mobileViewSignal()) {
      return;
    }
    this.mobileSidebarOpenSignal.update((value) => !value);
  }

  openMobileSidebar(): void {
    this.mobileSidebarOpenSignal.set(true);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpenSignal.set(false);
    this.mobileParentSignal.set(null);
  }

  openMobileChildren(parent: NavigationItem): void {
    this.mobileParentSignal.set(parent);
  }

  closeMobileChildren(): void {
    this.mobileParentSignal.set(null);
  }
}
