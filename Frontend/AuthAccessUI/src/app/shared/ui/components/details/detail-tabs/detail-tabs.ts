import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../button/button';
import { DetailTab } from './detail-tab.model';

@Component({
  selector: 'app-detail-tabs',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './detail-tabs.html',
  styleUrl: './detail-tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailTabs {
  readonly tabs = input.required<DetailTab[]>();
  readonly activeTabId = input.required<string>();
  readonly tabChanged = output<string>();

  protected selectTab(tabId: string): void {
    this.tabChanged.emit(tabId);
  }
}
