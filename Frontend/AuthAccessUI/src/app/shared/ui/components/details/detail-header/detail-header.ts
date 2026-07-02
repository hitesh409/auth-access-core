import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BadgeComponent } from '../../badge/badge';
import { BadgeVariant } from '../../../models/badge.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface DetailHeaderMetadata {
  label: string;
  value: string | number;
  icon?: IconDefinition;
  variant?: BadgeVariant;
}

@Component({
  selector: 'app-detail-header',
  standalone: true,
  imports: [BadgeComponent, FontAwesomeModule],
  templateUrl: './detail-header.html',
  styleUrl: './detail-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeader {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly avatarUrl = input('');

  readonly status = input('');
  readonly statusVariant = input<BadgeVariant>('neutral');

  readonly metadata = input<DetailHeaderMetadata[]>([]);

  readonly initials = computed(() => {
    const parts = this.title().split(' ').filter(Boolean);

    return parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  });
}
