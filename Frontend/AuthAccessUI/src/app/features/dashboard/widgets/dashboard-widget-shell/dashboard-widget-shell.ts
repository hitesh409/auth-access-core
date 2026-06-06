import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonComponent, EnterpriseCardComponent } from '../../../../shared';

@Component({
  selector: 'app-dashboard-widget-shell',
  standalone: true,
  imports: [EnterpriseCardComponent, ButtonComponent],
  templateUrl: './dashboard-widget-shell.html',
  styleUrl: './dashboard-widget-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWidgetShell {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly actionText = input('');
}
