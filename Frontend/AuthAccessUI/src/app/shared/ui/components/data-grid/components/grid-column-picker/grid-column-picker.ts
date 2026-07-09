import { Component, computed, input, output } from '@angular/core';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ButtonComponent } from '../../../button/button';
import { GridColumn } from '../../models/grid-column.model';

@Component({
  selector: 'app-grid-column-picker',
  standalone: true,
  imports: [ButtonComponent, DragDropModule],
  templateUrl: './grid-column-picker.html',
  styleUrl: './grid-column-picker.scss',
})
export class GridColumnPickerComponent {
  columns = input.required<GridColumn[]>();
  selectedColumns = input.required<string[]>();
  selectionChanged = output<string[]>();

  /** Columns the user can actually toggle — always-on columns aren't shown. */
  protected readonly hideableColumns = computed(() =>
    this.columns().filter((column) => column.hideable !== false),
  );

  private readonly alwaysVisibleCount = computed(
    () => this.columns().length - this.hideableColumns().length,
  );

  /** Visible hideable columns, in their current (reorderable) order — these are draggable. */
  protected readonly visibleHideableColumns = computed(() => {
    const selected = this.selectedColumns();
    const hideableByKey = new Map(this.hideableColumns().map((c) => [c.key.toString(), c]));
    return selected
      .map((key) => hideableByKey.get(key))
      .filter((c): c is GridColumn => !!c);
  });

  /** Hidden hideable columns — shown unchecked below a divider, not draggable. */
  protected readonly hiddenHideableColumns = computed(() => {
    const selected = new Set(this.selectedColumns());
    return this.hideableColumns().filter((c) => !selected.has(c.key.toString()));
  });

  protected isChecked(column: GridColumn): boolean {
    return this.selectedColumns().includes(column.key.toString());
  }

  toggle(column: string): void {
    const selected = [...this.selectedColumns()];
    const index = selected.indexOf(column);

    if (index >= 0) {
      // Never allow every column to disappear — keep at least one visible.
      const hideableSelectedCount = this.hideableColumns().filter((c) => this.isChecked(c)).length;
      if (hideableSelectedCount === 1 && this.alwaysVisibleCount() === 0) {
        return;
      }
      selected.splice(index, 1);
    } else {
      selected.push(column);
    }

    this.selectionChanged.emit(selected);
  }

  /** Reorders only among the currently-visible hideable columns; non-hideable
   * columns and hidden columns keep their existing positions untouched. */
  protected reorder(event: CdkDragDrop<GridColumn[]>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const reorderedVisibleKeys = this.visibleHideableColumns().map((c) => c.key.toString());
    moveItemInArray(reorderedVisibleKeys, event.previousIndex, event.currentIndex);

    let cursor = 0;
    const next = this.selectedColumns().map((key) => {
      const column = this.columns().find((c) => c.key.toString() === key);
      if (column && column.hideable !== false) {
        return reorderedVisibleKeys[cursor++];
      }
      return key;
    });

    this.selectionChanged.emit(next);
  }

  protected showAll(): void {
    this.selectionChanged.emit(this.columns().map((column) => column.key.toString()));
  }
}
