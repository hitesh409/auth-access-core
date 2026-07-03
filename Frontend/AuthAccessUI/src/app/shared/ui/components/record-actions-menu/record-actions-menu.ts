import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { ButtonComponent } from '../button/button';
import { APP_ICONS } from '../../../icons/font-awesome.icons';
import { RecordActionItem } from './record-action-item.model';

@Component({
  selector: 'app-record-actions-menu',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './record-actions-menu.html',
  styleUrl: './record-actions-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordActionsMenu {
  readonly actions = input<RecordActionItem[]>([]);

  readonly icons = APP_ICONS;
  readonly open = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected run(item: RecordActionItem): void {
    this.open.set(false);
    item.action();
  }
}
