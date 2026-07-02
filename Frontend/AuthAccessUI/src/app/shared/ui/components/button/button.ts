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
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly icon = input<IconDefinition | undefined>(undefined);
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly active = input(false);
  protected readonly classes = computed(() =>
    ['btn', `btn--${this.variant()}`, `btn--${this.size()}`, this.active() ? 'btn--active' : '']
      .filter(Boolean)
      .join(' '),
  );
}
