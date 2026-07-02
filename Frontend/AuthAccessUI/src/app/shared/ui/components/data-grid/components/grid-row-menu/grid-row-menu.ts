import { Component, HostListener, input, output, signal } from '@angular/core';

import { GridAction } from '../../models/grid-action.model';
import { APP_ICONS } from '../../../../../icons/font-awesome.icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from "../../../button/button";

@Component({
  selector: 'app-grid-row-menu',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent],
  templateUrl: './grid-row-menu.html',
  styleUrl: './grid-row-menu.scss',
})
export class GridRowMenuComponent {
  readonly actions = input<GridAction[]>([]);
  readonly actionClicked = output<GridAction>();

  protected readonly open = signal(false);
  protected readonly faEllipsisVertical = APP_ICONS.more;

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected execute(action: GridAction): void {
    this.actionClicked.emit(action);
    this.open.set(false);
  }

  @HostListener('document:click')
  protected close(): void {
    this.open.set(false);
  }
}
