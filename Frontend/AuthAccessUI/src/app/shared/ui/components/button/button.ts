import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ButtonSize, ButtonVariant } from '../../models/button.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.btn--block-host]': 'block()',
  },
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly icon = input<IconDefinition | undefined>(undefined);
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly active = input(false);
  readonly block = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);
  protected readonly classes = computed(() =>
    [
      'btn',
      `btn--${this.variant()}`,
      `btn--${this.size()}`,
      this.active() ? 'btn--active' : '',
      this.block() ? 'btn--block' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
