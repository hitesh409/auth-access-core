import { Component, input, output } from '@angular/core';

import { ButtonComponent } from '../../../button/button';

import { GridBulkAction } from '../../models/grid-bulk-action.model';

@Component({
  selector: 'app-grid-bulk-actions',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './grid-bulk-actions.html',
  styleUrl: './grid-bulk-actions.scss',
})
export class GridBulkActionsComponent {
  selectedCount = input.required<number>();
  actions = input.required<GridBulkAction[]>();
  totalMatching = input(0);
  showSelectAllBanner = input(false);
  execute = output<GridBulkAction>();
  selectAllMatching = output<void>();
}
