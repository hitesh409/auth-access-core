import { Injectable, computed, signal } from '@angular/core';
import { NavigationItem } from './models/navigation-items.model';

@Injectable({
  providedIn: 'root',
})
export class FlyoutService {
  private readonly activeParentSignal = signal<NavigationItem | null>(null);
  readonly activeParent = this.activeParentSignal.asReadonly();
  readonly isOpen = computed(() => this.activeParentSignal() !== null);

  open(item: NavigationItem): void {
    this.activeParentSignal.set(item);
  }

  close(): void {
    this.activeParentSignal.set(null);
  }

  toggle(item: NavigationItem): void {
    const current = this.activeParentSignal();
    if (current?.id === item.id) {
      this.close();
      return;
    }
    this.open(item);
  }
}
