import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ButtonVariant, ButtonSize } from '../../models/button.model';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  icon = input<IconDefinition | null>(null);
  loading = input(false);
  disabled = input(false);
  protected readonly classes = computed(() =>
    ['btn', `btn--${this.variant()}`, `btn--${this.size()}`].join(' '),
  );
}
