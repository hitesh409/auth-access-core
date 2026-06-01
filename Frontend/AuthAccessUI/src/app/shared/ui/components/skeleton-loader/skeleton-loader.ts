import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SkeletonVariant, SkeletonAnimation } from '../../models/skeleton.model';


@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  templateUrl: './skeleton-loader.html',
  styleUrl: './skeleton-loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent {
  variant = input<SkeletonVariant>('text');
  animation = input<SkeletonAnimation>('shimmer');
  width = input<string>();
  height = input<string>();

  protected readonly classes = computed(() =>
    ['skeleton', `skeleton--${this.variant()}`, `skeleton--${this.animation()}`].join(' '),
  );
}
