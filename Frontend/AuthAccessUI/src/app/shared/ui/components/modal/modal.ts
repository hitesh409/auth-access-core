import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { APP_ICONS } from '../../../icons/font-awesome.icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnDestroy {
  readonly isOpen = input(false);
  readonly title = input('');
  readonly subtitle = input('');
  readonly closed = output();

  readonly icons = APP_ICONS;

  private readonly document = inject(DOCUMENT);

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
    if (this.isOpen()) {
      this.closed.emit();
    }
  }

  protected close(): void {
    this.closed.emit();
  }
}
