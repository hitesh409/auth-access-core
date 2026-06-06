import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { PageHeader, BadgeComponent, ButtonComponent } from '../../shared';

import { DashboardService } from './dashboard.service';

import { DashboardMetricCardComponent } from './widgets/dashboard-metric-card/dashboard-metric-card';
import { QuickActionWidget } from './widgets/quick-action-widget/quick-action-widget';
import { RecentAuditWidget } from './widgets/recent-audit-widget/recent-audit-widget';
import { RecentLoginWidget } from './widgets/recent-login-widget/recent-login-widget';

import { NAVIGATION_ITEMS } from '../../core/navigation/config/navigation-items.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PageHeader,
    FontAwesomeModule,
    DashboardMetricCardComponent,
    QuickActionWidget,
    RecentAuditWidget,
    RecentLoginWidget,
    BadgeComponent,
    ButtonComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  readonly dashboardService = inject(DashboardService);
  readonly loading = this.dashboardService.loading;
  readonly metrics = this.dashboardService.metrics;
  readonly arrowIcon = faArrowRight;

  readonly breadcrumbs = [
    {
      label: 'Dashboard',
      route: NAVIGATION_ITEMS[0].route,
      icon: NAVIGATION_ITEMS[0].icon,
    },
  ];
}
