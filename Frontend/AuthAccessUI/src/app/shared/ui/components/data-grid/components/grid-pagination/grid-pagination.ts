import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../../../button/button';

@Component({
  selector: 'app-grid-pagination',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './grid-pagination.html',
  styleUrl: './grid-pagination.scss',
})
export class GridPaginationComponent {
  page = input.required<number>();
  pageSize = input.required<number>();
  totalItems = input.required<number>();
  pageChanged = output<number>();

  protected readonly Math = Math;
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));

  previous(): void {
    if (this.page() <= 1) {
      return;
    }

    this.pageChanged.emit(this.page() - 1);
  }

  next(): void {
    if (this.page() >= this.totalPages()) {
      return;
    }

    this.pageChanged.emit(this.page() + 1);
  }
  
}
