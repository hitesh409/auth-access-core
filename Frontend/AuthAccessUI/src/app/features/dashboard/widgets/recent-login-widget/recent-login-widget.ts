import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { BadgeComponent, ButtonComponent, EmptyStateComponent, SkeletonLoaderComponent } from '../../../../shared';
import { DashboardService } from '../../dashboard.service';
import { DashboardWidgetShell } from '../dashboard-widget-shell/dashboard-widget-shell';

@Component({
  selector: 'app-recent-login-widget',
  imports: [DashboardWidgetShell, BadgeComponent, ButtonComponent, EmptyStateComponent, SkeletonLoaderComponent],
  standalone: true,
  templateUrl: './recent-login-widget.html',
  styleUrl: './recent-login-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentLoginWidget {
  private readonly dashboardService = inject(DashboardService);
  private readonly router = inject(Router);

  readonly emptyIcon = faRightToBracket;
  readonly loading = this.dashboardService.loading;
  readonly logins = this.dashboardService.recentLogins;
  readonly skeletonRows = [1, 2, 3, 4, 5];

  viewActivity(): void {
    this.router.navigateByUrl('/reports/login-activity');
  }
}
