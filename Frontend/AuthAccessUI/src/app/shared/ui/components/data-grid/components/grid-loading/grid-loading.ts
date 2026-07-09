import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SkeletonLoaderComponent } from '../../../skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-grid-loading',
  standalone: true,
  imports: [SkeletonLoaderComponent],
  templateUrl: './grid-loading.html',
  styleUrl: './grid-loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLoadingComponent {
  /** Number of data columns to mimic (excludes the checkbox column). */
  readonly columnCount = input(6);

  protected readonly rows = [1, 2, 3, 4, 5];
  protected readonly columns = computed(() => Array.from({ length: this.columnCount() }));
  protected readonly gridTemplateColumns = computed(
    () => `48px repeat(${this.columnCount()}, 1fr)`,
  );
}
