import { Injectable, signal } from '@angular/core';

export type GridDensity = 'comfortable' | 'compact';

const STORAGE_KEY = 'grid-density';

@Injectable({ providedIn: 'root' })
export class GridDensityService {
  private readonly densitySignal = signal<GridDensity>(this.loadInitial());
  readonly density = this.densitySignal.asReadonly();

  setDensity(value: GridDensity): void {
    this.densitySignal.set(value);
    localStorage.setItem(STORAGE_KEY, value);
  }

  toggle(): void {
    this.setDensity(this.densitySignal() === 'compact' ? 'comfortable' : 'compact');
  }

  private loadInitial(): GridDensity {
    return localStorage.getItem(STORAGE_KEY) === 'compact' ? 'compact' : 'comfortable';
  }
}
