import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BadgeComponent, EnterpriseCardComponent, SkeletonLoaderComponent } from '../../../../shared';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-dashboard-metric-card',
  standalone: true,
  imports: [EnterpriseCardComponent, FontAwesomeModule, BadgeComponent, SkeletonLoaderComponent],
  templateUrl: './dashboard-metric-card.html',
  styleUrl: './dashboard-metric-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMetricCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly subtitle = input.required<string>();
  readonly icon = input.required<any>();
  readonly tone = input<'primary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
  readonly displayAs = input<'value' | 'badge'>('value');
  readonly statusVariant = input<'success' | 'warning' | 'error'>('success');
  readonly loading = input(false);
}
