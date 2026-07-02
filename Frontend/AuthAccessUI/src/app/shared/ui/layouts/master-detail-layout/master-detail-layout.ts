import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NavigatorPanelService } from '../../../../core/layout/navigator-panel.service';
import { MasterDetailVariant } from './models/master-detail-variant.model';

@Component({
  selector: 'app-master-detail-layout',
  standalone: true,
  templateUrl: './master-detail-layout.html',
  styleUrl: './master-detail-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterDetailLayoutComponent {
  readonly variant = input<MasterDetailVariant>('split');
  readonly hasSelection = input(false);

  protected readonly panelService = inject(NavigatorPanelService);

  protected readonly classes = computed(() => {
    const classes = ['master-detail', `master-detail--${this.variant()}`];
    if (this.hasSelection()) classes.push('master-detail--selected');
    if (this.panelService.isOpen()) classes.push('master-detail--navigator-open');
    return classes.join(' ');
  });
}
