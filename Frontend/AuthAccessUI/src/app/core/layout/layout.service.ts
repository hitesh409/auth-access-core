import { Injectable, computed, signal } from '@angular/core';
import { MOBILE_BREAKPOINT } from './constants/layout.constants';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
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
  }
}
