import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { BadgeVariant, BadgeSize } from '../../models/badge.model';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  variant = input<BadgeVariant>('neutral');
  size = input<BadgeSize>('md');
  icon = input<IconDefinition | null>(null);

  protected readonly classes = computed(() =>
    ['badge', `badge--${this.variant()}`, `badge--${this.size()}`].join(' '),
  );
}
