import { Injectable, computed, signal } from '@angular/core';

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

  setSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  setPage(page: number): void {
    this.page.set(page);
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
  }

  setSelectedRows(ids: string[]): void {
    this.selectedRows.set(new Set(ids));
  }

  toggleRow(id: string): void {
    const selected = new Set(this.selectedRows());
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
    this.selectedRows.set(selected);
  }
  
  setVisibleColumns(columns: string[]): void {
    this.visibleColumns.set(columns);
  }
}
