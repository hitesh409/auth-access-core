import { Injectable, computed, signal } from '@angular/core';

import { FilterGroupNode, countConditions } from './models/grid-filter.model';

export type SortDirection = 'asc' | 'desc' | null;

@Injectable()
export class GridStateService {
  readonly search = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(10);
  readonly sortColumn = signal<string | null>(null);
  readonly sortDirection = signal<SortDirection>(null);
  readonly selectedRows = signal<Set<string>>(new Set());
  readonly visibleColumns = signal<string[]>([]);
  readonly selectedCount = computed(() => this.selectedRows().size);
  readonly hasSelection = computed(() => this.selectedCount() > 0);

  readonly filter = signal<FilterGroupNode | null>(null);
  readonly activeFilterCount = computed(() => countConditions(this.filter()));
  readonly hasActiveFilter = computed(() => this.activeFilterCount() > 0);
  readonly selectAllMatchingActive = signal(false);

  setSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  setFilter(filter: FilterGroupNode | null): void {
    this.filter.set(filter && countConditions(filter) > 0 ? filter : null);
    this.page.set(1);
  }

  setPage(page: number): void {
    this.page.set(page);
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
  }

  setSort(column: string, direction: SortDirection): void {
    this.sortColumn.set(direction ? column : null);
    this.sortDirection.set(direction);
  }

  toggleSort(column: string): void {
    if (this.sortColumn() !== column) {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
      return;
    }

    switch (this.sortDirection()) {
      case 'asc':
        this.sortDirection.set('desc');
        break;

      case 'desc':
        this.sortDirection.set(null);
        this.sortColumn.set(null);
        break;

      default:
        this.sortDirection.set('asc');
    }
  }

  clearSelection(): void {
    this.selectedRows.set(new Set());
    this.selectAllMatchingActive.set(false);
  }

  setSelectedRows(ids: string[]): void {
    this.selectedRows.set(new Set(ids));
    this.selectAllMatchingActive.set(false);
  }

  toggleRow(id: string): void {
    const selected = new Set(this.selectedRows());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this.selectedRows.set(selected);
    this.selectAllMatchingActive.set(false);
  }

  /** Select every row matching the current search/filter, across all pages. */
  selectAllMatching(ids: string[]): void {
    this.selectedRows.set(new Set(ids));
    this.selectAllMatchingActive.set(true);
  }


  setVisibleColumns(columns: string[]): void {
    this.visibleColumns.set(columns);
  }
}
