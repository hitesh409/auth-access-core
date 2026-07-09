import { Component, computed, effect, ElementRef, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridColumn } from './models/grid-column.model';
import { FilterGroupNode, evaluateFilter } from './models/grid-filter.model';
import { BadgeComponent } from '../badge/badge';
import { GridAction } from './models/grid-action.model';
import { GridToolbarComponent } from './components/grid-toolbar/grid-toolbar';
import { GridPaginationComponent } from './components/grid-pagination/grid-pagination';
import { GridStateService } from './grid-state.service';
import { EmptyStateComponent } from '../empty-state/empty-state';
import { faDatabase, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GridLoadingComponent } from './components/grid-loading/grid-loading';
import { GridBulkAction } from './models/grid-bulk-action.model';
import { GridBulkActionsComponent } from './components/grid-bulk-actions/grid-bulk-actions';
import { EnterpriseCardComponent } from '../enterprise-card/enterprise-card';
import { APP_ICONS } from '../../../icons/font-awesome.icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridRowMenuComponent } from './components/grid-row-menu/grid-row-menu';
import { ButtonComponent } from '../button/button';
import { GridDensityService } from '../../../../core/layout/grid-density.service';

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
  private readonly densityService = inject(GridDensityService);
  protected readonly density = this.densityService.density;
  readonly showColumnPicker = signal(false);
  readonly showFilter = signal(false);
  columns = input.required<GridColumn[]>();
  rows = input.required<any[]>();
  loading = input(false);
  gridId = input('users');
  searchPlaceholder = input('Search...');
  bulkActions = input<GridBulkAction[]>([]);
  selectionMode = input<'none' | 'single' | 'multiple'>('multiple');
  filterable = input(true);
  readonly rowSelected = output<any>();
  readonly selectionChanged = output<string[]>();
  readonly activeRowId = signal<string | null>(null);
  readonly activeRowChanged = output<string>();
  readonly refresh = output<void>();
  readonly detailOpened = output<any>();

  protected readonly isTouchDevice: boolean =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  protected openDetail(row: any, event: Event): void {
    event.stopPropagation();
    this.detailOpened.emit(row);
  }

  protected onRowClick(row: any): void {
    if (this.isTouchDevice) {
      return;
    }
    this.selectRow(row);
  }

  protected cellTooltip(row: Record<string, unknown>, column: GridColumn): string | null {
    if (column.type === 'badge' || column.type === 'actions') {
      return null;
    }
    const value = this.getCellValue(row, column);
    return value == null ? null : String(value);
  }

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  protected readonly focusedCell = signal({ row: 0, col: 0 });

  constructor() {
    effect(() => {
      const cell = this.focusedCell();
      queueMicrotask(() => {
        this.elementRef.nativeElement
          .querySelector<HTMLElement>(
            `[data-cell-row="${cell.row}"][data-cell-col="${cell.col}"]`,
          )
          ?.focus();
      });
    });
  }

  protected isFocusedCell(row: number, col: number): boolean {
    const cell = this.focusedCell();
    return cell.row === row && cell.col === col;
  }

  protected onCellFocus(row: number, col: number): void {
    if (!this.isFocusedCell(row, col)) {
      this.focusedCell.set({ row, col });
    }
  }

  protected onCellKeydown(event: KeyboardEvent, row: number, col: number): void {
    const lastCol = this.visibleColumns().length; // 0 = checkbox, 1..n = data columns
    const lastRow = this.pagedRows().length - 1;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.focusedCell.set({ row, col: Math.min(col + 1, lastCol) });
        return;
      case 'ArrowLeft':
        event.preventDefault();
        this.focusedCell.set({ row, col: Math.max(col - 1, 0) });
        return;
      case 'ArrowDown':
        event.preventDefault();
        this.focusedCell.set({ row: Math.min(row + 1, lastRow), col });
        return;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedCell.set({ row: Math.max(row - 1, 0), col });
        return;
      case 'Enter': {
        const targetRow = this.pagedRows()[row];
        if (targetRow) {
          this.selectRow(targetRow);
        }
        return;
      }
      case ' ': {
        event.preventDefault();
        const targetRow = this.pagedRows()[row];
        if (targetRow) {
          this.toggleSelection(targetRow.id);
        }
        return;
      }
    }
  }

  protected selectRow(row: any): void {
    this.activeRowId.set(row.id);
    this.activeRowChanged.emit(row.id)
    this.rowSelected.emit(row);
  }

  ngOnInit(): void {
    this.loadColumns();
    if (this.state.visibleColumns().length === 0) {
      this.state.setVisibleColumns(
        this.columns()
          .filter((column) => !column.hidden)
          .map((column) => column.key.toString()),
      );
    }
    this.loadColumnWidths();
    this.loadFilter();
  }

  private get storageKey(): string {
    return `grid-columns-${this.gridId()}`;
  }

  private get widthsStorageKey(): string {
    return `grid-column-widths-${this.gridId()}`;
  }

  private get filterStorageKey(): string {
    return `grid-filter-${this.gridId()}`;
  }

  private loadFilter(): void {
    try {
      const saved = localStorage.getItem(this.filterStorageKey);
      if (saved) {
        this.state.setFilter(JSON.parse(saved) as FilterGroupNode);
      }
    } catch {
      // corrupt/stale persisted filter — ignore and start unfiltered
    }
  }

  protected onFilterChange(filter: FilterGroupNode | null): void {
    this.state.setFilter(filter);
    // Persist the normalized result (state.filter is null when empty).
    const normalized = this.state.filter();
    if (normalized) {
      localStorage.setItem(this.filterStorageKey, JSON.stringify(normalized));
    } else {
      localStorage.removeItem(this.filterStorageKey);
    }
  }

  protected toggleFilter(): void {
    this.showFilter.update((value) => !value);
  }

  // =========================================
  //  COLUMN RESIZE
  // =========================================

  protected readonly columnWidths = signal<Record<string, string>>({});
  private resizingKey: string | null = null;
  private resizeStartX = 0;
  private resizeStartWidth = 0;
  private readonly boundResizeMove = (event: PointerEvent) => this.handleResizeMove(event);
  private readonly boundResizeEnd = () => this.handleResizeEnd();

  protected effectiveWidth(column: GridColumn): string | undefined {
    return this.columnWidths()[column.key.toString()] ?? column.width;
  }

  protected canResizeColumn(column: GridColumn): boolean {
    return column.resizable !== false;
  }

  protected startResize(event: PointerEvent, column: GridColumn): void {
    event.preventDefault();
    event.stopPropagation();
    this.resizingKey = column.key.toString();
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.parseWidth(this.effectiveWidth(column)) ?? 120;
    document.addEventListener('pointermove', this.boundResizeMove);
    document.addEventListener('pointerup', this.boundResizeEnd);
  }

  private handleResizeMove(event: PointerEvent): void {
    if (!this.resizingKey) {
      return;
    }
    const column = this.columns().find((c) => c.key.toString() === this.resizingKey);
    const min = this.parseWidth(column?.minWidth) ?? 60;
    const delta = event.clientX - this.resizeStartX;
    const next = Math.max(min, this.resizeStartWidth + delta);
    const key = this.resizingKey;
    this.columnWidths.update((widths) => ({ ...widths, [key]: `${next}px` }));
  }

  private handleResizeEnd(): void {
    if (!this.resizingKey) {
      return;
    }
    document.removeEventListener('pointermove', this.boundResizeMove);
    document.removeEventListener('pointerup', this.boundResizeEnd);
    this.resizingKey = null;
    localStorage.setItem(this.widthsStorageKey, JSON.stringify(this.columnWidths()));
  }

  private loadColumnWidths(): void {
    try {
      const saved = localStorage.getItem(this.widthsStorageKey);
      if (saved) {
        this.columnWidths.set(JSON.parse(saved));
      }
    } catch {
      // malformed storage — ignore, start with no custom widths
    }
  }

  private parseWidth(value: string | undefined | null): number | null {
    if (!value) {
      return null;
    }
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  readonly emptyStateIcon = computed(() =>
    this.state.search().trim() || this.state.hasActiveFilter() ? faMagnifyingGlass : faDatabase,
  );

  readonly description = computed(() => {
    if (this.state.hasActiveFilter()) {
      return 'No records match the active filter. Try adjusting or clearing it.';
    }
    return this.state.search().trim()
      ? 'Try adjusting your search criteria.'
      : 'No data available to display.';
  });

  readonly isEmpty = computed(() => !this.loading() && this.filteredRows().length === 0);

  /** Distinct values per badge/enum column, feeding the filter's value
   * pickers so users choose from real values (e.g. Active/Expired/Revoked)
   * instead of typing free text. */
  readonly distinctValues = computed<Record<string, string[]>>(() => {
    const map: Record<string, Set<string>> = {};
    for (const column of this.columns()) {
      if (column.type === 'badge') {
        map[column.key.toString()] = new Set();
      }
    }
    for (const row of this.rows()) {
      for (const key of Object.keys(map)) {
        const value = row[key];
        if (value !== null && value !== undefined && String(value).trim() !== '') {
          map[key].add(String(value));
        }
      }
    }
    const result: Record<string, string[]> = {};
    for (const key of Object.keys(map)) {
      result[key] = [...map[key]].sort();
    }
    return result;
  });

  readonly filteredRows = computed(() => {
    const term = this.state.search().toLowerCase();
    let result = this.rows();
    if (term) {
      result = result.filter((row) => Object.values(row).join(' ').toLowerCase().includes(term));
    }
    // Advanced filter (nested AND/OR conditions) applies on top of quick search.
    const filter = this.state.filter();
    if (filter) {
      result = result.filter((row) => evaluateFilter(row, filter, this.columns()));
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

  readonly showSelectAllBanner = computed(() => {
    if (this.state.selectAllMatchingActive()) {
      return false;
    }
    const rows = this.pagedRows();
    if (rows.length === 0) {
      return false;
    }
    const selected = this.state.selectedRows();
    const allOnPageSelected = rows.every((row) => selected.has(row.id));
    return allOnPageSelected && this.filteredRows().length > rows.length;
  });

  protected onSelectAllMatching(): void {
    const ids = this.filteredRows().map((row) => row.id);
    this.state.selectAllMatching(ids);
    this.selectionChanged.emit(ids);
  }

  /** Render order follows `saved` (reorderable via the column picker),
   * not the fixed order of the `columns` input — otherwise drag-reorder
   * would persist but never visibly change anything. */
  readonly visibleColumns = computed(() => {
    const saved = this.state.visibleColumns();
    const byKey = new Map(this.columns().map((column) => [column.key.toString(), column]));

    const ordered = saved
      .map((key) => byKey.get(key))
      .filter((column): column is GridColumn => !!column);

    const alreadyIncluded = new Set(ordered.map((column) => column.key.toString()));
    const missingAlwaysVisible = this.columns().filter(
      (column) => column.hideable === false && !alreadyIncluded.has(column.key.toString()),
    );

    return [...ordered, ...missingAlwaysVisible];
  });

  protected sort(column: string): void {
    this.state.toggleSort(column);
  }

  protected readonly isScrolledX = signal(false);

  protected onTableScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.isScrolledX.set(target.scrollLeft > 0);
  }

  protected readonly openHeaderMenu = signal<string | null>(null);

  protected toggleHeaderMenu(key: string, event: MouseEvent): void {
    event.stopPropagation();
    this.openHeaderMenu.update((current) => (current === key ? null : key));
  }

  protected closeHeaderMenu(): void {
    this.openHeaderMenu.set(null);
  }

  protected sortColumnDirection(key: string, direction: 'asc' | 'desc'): void {
    this.state.setSort(key, direction);
    this.closeHeaderMenu();
  }

  protected canHideColumn(column: GridColumn): boolean {
    return column.hideable !== false;
  }

  protected hideColumn(key: string): void {
    const column = this.columns().find((c) => c.key.toString() === key);
    if (!column || column.hideable === false || this.visibleColumns().length <= 1) {
      return;
    }
    this.saveColumns(this.state.visibleColumns().filter((k) => k !== key));
    this.closeHeaderMenu();
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
    this.selectionChanged.emit([...this.state.selectedRows()]);
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
    const next = [...selected];
    this.state.setSelectedRows(next);
    this.selectionChanged.emit(next);
  }

  protected onRefresh(): void {
    this.refresh.emit();
  }

  /** Exports the current search/sort result (all pages) as CSV, respecting visible columns. */
  protected onExport(): void {
    const columns = this.visibleColumns().filter((column) => column.type !== 'actions');
    const header = columns.map((column) => this.csvCell(column.header));
    const rows = this.filteredRows().map((row) =>
      columns.map((column) => this.csvCell(this.getCellValue(row, column))).join(','),
    );
    const csv = [header.join(','), ...rows].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${this.gridId()}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private csvCell(value: unknown): string {
    const text = value == null ? '' : String(value);
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
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

  protected ariaSort(column: GridColumn): 'ascending' | 'descending' | 'none' | null {
    if (!column.sortable) {
      return null;
    }
    if (!this.isSortedColumn(column.key.toString())) {
      return 'none';
    }
    return this.isAscending(column.key.toString()) ? 'ascending' : 'descending';
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
