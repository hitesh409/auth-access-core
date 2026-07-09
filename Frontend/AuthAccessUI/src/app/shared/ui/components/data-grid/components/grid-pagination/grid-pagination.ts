import { Component, computed, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../../button/button';
import { APP_ICONS } from '../../../../../icons/font-awesome.icons';

@Component({
  selector: 'app-grid-pagination',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule],
  templateUrl: './grid-pagination.html',
  styleUrl: './grid-pagination.scss',
})
export class GridPaginationComponent {
  page = input.required<number>();
  pageSize = input.required<number>();
  totalItems = input.required<number>();
  pageChanged = output<number>();
  pageSizeChanged = output<number>();

  protected readonly pageSizeOptions = [10, 25, 50, 100];
  protected readonly icons = APP_ICONS;
  protected readonly Math = Math;
  protected readonly pageSizeOpen = signal(false);

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.pageSize())));

  protected togglePageSize(): void {
    this.pageSizeOpen.update((open) => !open);
  }

  protected selectPageSize(size: number): void {
    this.pageSizeOpen.set(false);
    if (size !== this.pageSize()) {
      this.pageSizeChanged.emit(size);
    }
  }

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
