import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { ButtonComponent } from '../button/button';
import { ButtonVariant } from '../../models/button.model';
import { APP_ICONS } from '../../../icons/font-awesome.icons';

export type ConfirmationTone = 'danger' | 'warning' | 'primary';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModal implements OnDestroy {
  readonly isOpen = input(false);
  readonly title = input('Are you sure?');
  readonly message = input('');
  readonly confirmLabel = input('Confirm');
  readonly cancelLabel = input('Cancel');
  readonly tone = input<ConfirmationTone>('danger');
  readonly icon = input<IconDefinition | undefined>(undefined);
  readonly loading = input(false);

  readonly confirmed = output();
  readonly cancelled = output();

  readonly icons = APP_ICONS;
  private readonly document = inject(DOCUMENT);

  readonly resolvedIcon = computed<IconDefinition>(() => this.icon() ?? this.icons.info);

  readonly confirmVariant = computed<ButtonVariant>(() =>
    this.tone() === 'danger' ? 'danger' : 'primary',
  );

  constructor() {
    effect(() => {
      this.document.body.style.overflow = this.isOpen() ? 'hidden' : '';
    });
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.isOpen() && !this.loading()) {
      this.cancelled.emit();
    }
  }

  protected confirm(): void {
    this.confirmed.emit();
  }

  protected cancel(): void {
    if (!this.loading()) {
      this.cancelled.emit();
    }
  }
}
