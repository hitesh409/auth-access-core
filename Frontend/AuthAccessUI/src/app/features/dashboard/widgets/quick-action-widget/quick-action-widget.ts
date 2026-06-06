import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faKey,
  faShieldHeart,
  faSitemap,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import { EnterpriseCardComponent } from '../../../../shared';
import { DashboardWidgetShell } from '../dashboard-widget-shell/dashboard-widget-shell';

@Component({
  selector: 'app-quick-action-widget',
  imports: [DashboardWidgetShell, EnterpriseCardComponent, FontAwesomeModule],
  templateUrl: './quick-action-widget.html',
  styleUrl: './quick-action-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionWidget {
  private readonly router = inject(Router);

  readonly arrowIcon = faArrowRight;

  readonly actions = [
    {
      title: 'Create User',
      description: 'Provision identities with verified templates.',
      icon: faUserPlus,
      tone: 'primary',
      route: '/admin/users',
      ariaLabel: 'Create User',
    },
    {
      title: 'Create Role',
      description: 'Package permissions into reusable bundles.',
      icon: faSitemap,
      tone: 'info',
      route: '/admin/roles',
      ariaLabel: 'Create Role',
    },
    {
      title: 'Security Center',
      description: 'Review alerts, drift, and risky activity.',
      icon: faShieldHeart,
      tone: 'warning',
      route: '/security/access-policies',
      ariaLabel: 'Security Center',
    },
    {
      title: 'Active Sessions',
      description: 'Inspect live sessions and revoke stale access.',
      icon: faKey,
      tone: 'success',
      route: '/security/sessions',
      ariaLabel: 'Active Sessions',
    },
  ];

  openAction(route: string): void {
    this.router.navigateByUrl(route);
  }

  openActionFromSpace(event: Event, route: string): void {
    event.preventDefault();
    this.openAction(route);
  }
}
