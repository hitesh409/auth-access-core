import { Injectable, computed, signal } from '@angular/core';

export type PanelBreakpoint = 'desktop' | 'tablet' | 'mobile';

@Injectable({ providedIn: 'root' })
export class NavigatorPanelService {
  private readonly _breakpoint = signal<PanelBreakpoint>(this.computeBreakpoint());
  private readonly _isOpen = signal(this._breakpoint() === 'desktop');

  readonly breakpoint = this._breakpoint.asReadonly();
  readonly isOpen = this._isOpen.asReadonly();
  readonly isMobile = computed(() => this._breakpoint() === 'mobile');
  readonly isTablet = computed(() => this._breakpoint() === 'tablet');
  readonly isDesktop = computed(() => this._breakpoint() === 'desktop');

  constructor() {
    window.addEventListener('resize', () => {
      const bp = this.computeBreakpoint();
      this._breakpoint.set(bp);
      if (bp === 'desktop') {
        this._isOpen.set(true);
      }
    });
  }

  private computeBreakpoint(): PanelBreakpoint {
    const w = window.innerWidth;
    if (w >= 1024) return 'desktop';
    if (w >= 768) return 'tablet';
    return 'mobile';
  }

  open(): void {
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
  }

  toggle(): void {
    this._isOpen.update((v) => !v);
  }
}
