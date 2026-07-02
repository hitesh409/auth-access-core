import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkeletonLoaderComponent } from '../../../skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-grid-loading',
  standalone: true,
  imports: [SkeletonLoaderComponent],
  templateUrl: './grid-loading.html',
  styleUrl: './grid-loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLoadingComponent {}
