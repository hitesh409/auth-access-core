import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { BadgeComponent } from '../components/badge/badge';
import { SearchBar } from '../components/search-bar/search-bar';
import { ButtonComponent } from '../components/button/button';
import { APP_ICONS } from '../../icons/font-awesome.icons';
import { EntityNavigatorTemplate } from './entity-navigator-template.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-entity-navigator',
  standalone: true,
  imports: [SearchBar, BadgeComponent, ButtonComponent, FontAwesomeModule, NgStyle],
  templateUrl: './entity-navigator.html',
  styleUrl: './entity-navigator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityNavigator<T> {
  readonly items = input.required<T[]>();
  readonly selected = input<T | null>(null);
  readonly template = input.required<EntityNavigatorTemplate<T>>();
  readonly pageSize = input(10);
  readonly selectionChanged = output<T>();
  readonly detailOpened = output<T>();

  readonly search = signal('');
  readonly statusFilter = signal('all');
  readonly currentPage = signal(1);
  readonly filterOpen = signal(false);

  readonly icons = APP_ICONS;

  readonly activeFilterLabel = computed(() => {
    const filters = this.template().filters ?? [];
    return filters.find((f) => f.value === this.statusFilter())?.label ?? 'All';
  });

  readonly totalUnfilteredItems = computed(() => this.items().length);

  readonly filteredItems = computed(() => {
    const search = this.search().trim().toLowerCase();
    const status = this.statusFilter();

    return this.items().filter((item) => {
      const matchesSearch = [
        this.template().title(item),
        this.template().subtitle?.(item),
        this.template().status?.(item),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search);

      const matchesStatus =
        status === 'all' ? true : this.template().status?.(item)?.toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  });

  readonly totalItems = computed(() => this.filteredItems().length);

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalItems() / this.pageSize())),
  );

  readonly pageStart = computed(() =>
    this.totalItems() === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1,
  );

  readonly pageEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.totalItems()),
  );

  readonly canGoPrev = computed(() => this.currentPage() > 1);
  readonly canGoNext = computed(() => this.currentPage() < this.totalPages());

  readonly paginatedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });

  constructor() {
    effect(() => {
      this.search();
      this.statusFilter();
      untracked(() => this.currentPage.set(1));
    });
  }

  private static readonly AVATAR_PALETTE = [
    { bg: 'rgba(99,102,241,.13)',  color: '#4f46e5' },
    { bg: 'rgba(16,185,129,.13)',  color: '#059669' },
    { bg: 'rgba(245,158,11,.13)',  color: '#b45309' },
    { bg: 'rgba(14,165,233,.13)',  color: '#0369a1' },
    { bg: 'rgba(244,63,94,.13)',   color: '#be123c' },
    { bg: 'rgba(139,92,246,.13)',  color: '#6d28d9' },
  ];

  protected avatarStyle(item: T): Record<string, string> {
    const text = this.template().title(item);
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash * 31 + text.charCodeAt(i)) & 0x7fffffff;
    }
    const p = EntityNavigator.AVATAR_PALETTE[hash % EntityNavigator.AVATAR_PALETTE.length];
    return { background: p.bg, color: p.color };
  }

  protected toggleFilter(): void {
    this.filterOpen.update((v) => !v);
  }

  protected selectFilter(value: string): void {
    this.statusFilter.set(value);
    this.filterOpen.set(false);
  }

  protected select(item: T): void {
    this.selectionChanged.emit(item);
  }

  protected openDetail(item: T, event: MouseEvent): void {
    event.stopPropagation();
    this.detailOpened.emit(item);
  }

  protected prevPage(): void {
    if (this.canGoPrev()) this.currentPage.update((p) => p - 1);
  }

  protected nextPage(): void {
    if (this.canGoNext()) this.currentPage.update((p) => p + 1);
  }
}
