import { Component, input, output } from '@angular/core';
import { GridColumn } from '../../models/grid-column.model';

@Component({
  selector: 'app-grid-column-picker',
  standalone: true,
  templateUrl: './grid-column-picker.html',
  styleUrl: './grid-column-picker.scss',
})
export class GridColumnPickerComponent {
  columns = input.required<GridColumn[]>();
  selectedColumns = input.required<string[]>();
  selectionChanged = output<string[]>();

  toggle(column: string): void {
    const selected = [...this.selectedColumns()];
    const index = selected.indexOf(column);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(column);
    }
    this.selectionChanged.emit(selected);
  }
}
