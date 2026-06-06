import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

import { BadgeComponent, EmptyStateComponent, SkeletonLoaderComponent } from '../../../../shared';
import { DashboardService } from '../../dashboard.service';
import { DashboardWidgetShell } from '../dashboard-widget-shell/dashboard-widget-shell';

@Component({
  selector: 'app-recent-audit-widget',
  standalone: true,
  imports: [DashboardWidgetShell, BadgeComponent, EmptyStateComponent, SkeletonLoaderComponent],
  templateUrl: './recent-audit-widget.html',
  styleUrl: './recent-audit-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentAuditWidget {
  private readonly dashboardService = inject(DashboardService);

  readonly emptyIcon = faClipboardList;
  readonly loading = this.dashboardService.loading;
  readonly events = this.dashboardService.auditEvents;
  readonly skeletonRows = [1, 2, 3, 4, 5];
}
