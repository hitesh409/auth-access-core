import { Injectable, Injector, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { NavigationItem } from './models/navigation-items.model';
import { NavigationOverlay } from './components/navigation-overlay/navigation-overlay';

@Injectable({
  providedIn: 'root',
})
export class NavigationOverlayService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  private overlayRef: OverlayRef | null = null;
  private activeParent: NavigationItem | null = null;
  private activeAnchor: HTMLElement | null = null;

  get currentParent(): NavigationItem | null {
    return this.activeParent;
  }

  open(parent: NavigationItem, anchor: HTMLElement): void {
    this.close();
    this.activeParent = parent;
    this.activeAnchor = anchor;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(anchor)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions([
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 12,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: false,
      panelClass: 'navigation-overlay-panel',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    this.overlayRef.outsidePointerEvents().subscribe((event) => {
      const target = event.target as Node | null;

      if (target && this.activeAnchor?.contains(target)) {
        return;
      }

      this.close();
    });
    const portal = new ComponentPortal(NavigationOverlay);
    this.overlayRef.attach(portal);
  }

  close(): void {
    this.activeParent = null;
    this.activeAnchor = null;
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  toggle(parent: NavigationItem, anchor: HTMLElement): void {
    if (this.activeParent?.id === parent.id) {
      this.close();
      return;
    }
    this.open(parent, anchor);
  }
}
