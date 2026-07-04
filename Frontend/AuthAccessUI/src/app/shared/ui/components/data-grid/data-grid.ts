import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridColumn } from './models/grid-column.model';
import { BadgeComponent } from '../badge/badge';
import { GridAction } from './models/grid-action.model';
import { GridToolbarComponent } from './components/grid-toolbar/grid-toolbar';
import { GridPaginationComponent } from './components/grid-pagination/grid-pagination';
import { GridStateService } from './grid-state.service';
import { EmptyStateComponent } from '../empty-state/empty-state';
import { faDatabase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GridLoadingComponent } from './components/grid-loading/grid-loading';
import { GridColumnPickerComponent } from './components/grid-column-picker/grid-column-picker';
import { GridBulkAction } from './models/grid-bulk-action.model';
import { GridBulkActionsComponent } from './components/grid-bulk-actions/grid-bulk-actions';
import { EnterpriseCardComponent } from '../enterprise-card/enterprise-card';
import { APP_ICONS } from '../../../icons/font-awesome.icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridRowMenuComponent } from './components/grid-row-menu/grid-row-menu';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [
    FormsModule,
    BadgeComponent,
    GridToolbarComponent,
    GridPaginationComponent,
    EmptyStateComponent,
    GridLoadingComponent,
    GridColumnPickerComponent,
    GridBulkActionsComponent,
    EnterpriseCardComponent,
    FontAwesomeModule,
    GridRowMenuComponent,
    ButtonComponent,
  ],
  providers: [GridStateService],
  templateUrl: './data-grid.html',
  styleUrl: './data-grid.scss',
})
export class DataGrid {
  protected readonly state = inject(GridStateService);
  protected readonly icons = APP_ICONS;
  readonly showColumnPicker = signal(false);
  columns = input.required<GridColumn[]>();
  rows = input.required<any[]>();
  loading = input(false);
  gridId = input('users');
  searchPlaceholder = input('Search...');
  bulkActions = input<GridBulkAction[]>([]);
  selectionMode = input<'none' | 'single' | 'multiple'>('multiple');
  readonly rowSelected = output<any>();
  readonly selectionChanged = output<string[]>();
  readonly activeRowId = signal<string | null>(null);
  readonly activeRowChanged = output<string>();

  protected selectRow(row: any): void {
    this.activeRowId.set(row.id);
    this.activeRowChanged.emit(row.id)
    this.rowSelected.emit(row);
  }

  ngOnInit(): void {
    this.loadColumns();
    if (this.state.visibleColumns().length === 0) {
      this.state.setVisibleColumns(this.columns().map((column) => column.key.toString()));
    }
  }

  private get storageKey(): string {
    return `grid-columns-${this.gridId()}`;
  }

  readonly emptyStateIcon = computed(() =>
    this.state.search().trim() ? faMagnifyingGlass : faDatabase,
  );

  readonly description = computed(() =>
    this.state.search().trim()
      ? 'Try adjusting your search criteria.'
      : 'No data available to display.',
  );

  readonly isEmpty = computed(() => !this.loading() && this.filteredRows().length === 0);

  readonly filteredRows = computed(() => {
    const term = this.state.search().toLowerCase();
    let result = this.rows();
    if (term) {
      result = result.filter((row) => Object.values(row).join(' ').toLowerCase().includes(term));
    }
    const column = this.state.sortColumn();
    if (column) {
      result = [...result].sort((a, b) => {
        const first = a[column];
        const second = b[column];
        if (first < second) {
          return this.state.sortDirection() === 'asc' ? -1 : 1;
        }
        if (first > second) {
          return this.state.sortDirection() === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return result;
  });

  readonly pagedRows = computed(() => {
    const start = (this.state.page() - 1) * this.state.pageSize();
    return this.filteredRows().slice(start, start + this.state.pageSize());
  });

  readonly allSelected = computed(
    () =>
      this.pagedRows().length > 0 &&
      this.pagedRows().every((row) => this.state.selectedRows().has(row.id)),
  );

  readonly selectedCount = computed(() => this.state.selectedRows().size);

  readonly visibleColumns = computed(() => {
    const saved = this.state.visibleColumns();
    if (saved.length === 0) {
      return this.columns();
    }
    return this.columns().filter((column) => saved.includes(column.key.toString()));
  });

  protected sort(column: string): void {
    this.state.toggleSort(column);
  }

  protected loadColumns(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) {
      return;
    }
    this.state.setVisibleColumns(JSON.parse(saved));
  }

  protected getCellValue(row: Record<string, unknown>, column: GridColumn): unknown {
    if (column.formatter) {
      return column.formatter(row);
    }
    return row[column.key as string];
  }

  protected executeAction(action: GridAction, row: unknown): void {
    action.action(row);
  }

  protected isSelected(id: string): boolean {
    return this.state.selectedRows().has(id);
  }

  protected toggleSelection(id: string): void {
    this.state.toggleRow(id);
  }

  protected toggleAll(): void {
    const rows = this.pagedRows();
    const selected = new Set(this.state.selectedRows());
    const allSelected = rows.every((row) => selected.has(row.id));
    if (allSelected) {
      rows.forEach((row) => selected.delete(row.id));
    } else {
      rows.forEach((row) => selected.add(row.id));
    }
    this.state.setSelectedRows([...selected]);
  }

  protected refreshGrid(): void {
    console.log('Refresh Grid');
  }

  protected exportGrid(): void {
    console.log('Export Grid');
  }

  protected onSearchChange(value: string): void {
    this.state.setSearch(value);
  }

  protected saveColumns(columns: string[]): void {
    this.state.setVisibleColumns(columns);
    localStorage.setItem(this.storageKey, JSON.stringify(columns));
  }

  protected toggleColumnPicker(): void {
    this.showColumnPicker.update((value) => !value);
  }

  protected executeBulkAction(action: GridBulkAction): void {
    action.action(Array.from(this.state.selectedRows()));
  }

  protected getSortIcon(column: string) {
    if (this.state.sortColumn() !== column) {
      return this.icons.sort;
    }
    return this.state.sortDirection() === 'asc' ? this.icons.sortAsc : this.icons.sortDesc;
  }

  protected isSortedColumn(column: string): boolean {
    return this.state.sortColumn() === column;
  }

  protected isAscending(column: string): boolean {
    return this.state.sortColumn() === column && this.state.sortDirection() === 'asc';
  }

  protected getPrimaryActions(actions: GridAction[]): GridAction[] {
    return actions.filter((action) => action.type === 'primary');
  }

  protected getSecondaryActions(actions: GridAction[]): GridAction[] {
    return actions.filter((action) => action.type !== 'primary');
  }
}
