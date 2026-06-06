import { Injectable, signal } from '@angular/core';
import { AuditEvent, DashboardMetric, RecentLogin } from './models/dashboard.models';
import { faLaptop, faLock, faShieldHalved, faUsers } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  readonly loading = signal(false);

  readonly metrics = signal<DashboardMetric[]>([
    {
      title: 'Authenticated Users',
      value: '12,847',
      subtitle: '+8.2% this week',
      icon: faUsers,
      tone: 'primary',
    },
    {
      title: 'Active Sessions',
      value: 342,
      subtitle: '23 currently active',
      icon: faLaptop,
      tone: 'info',
    },
    {
      title: 'Locked Accounts',
      value: 17,
      subtitle: 'Requires attention',
      icon: faLock,
      tone: 'warning',
    },
    {
      title: 'System Health',
      value: 'Healthy',
      subtitle: 'All systems operational',
      icon: faShieldHalved,
      tone: 'success',
      statusVariant: 'success',
      displayAs: 'badge',
    },
  ]);

  readonly recentLogins = signal<RecentLogin[]>([
    {
      id: '1',
      userName: 'John Smith',
      email: 'john@company.com',
      loginTime: '10 minutes ago',
    },
    {
      id: '2',
      userName: 'Sarah Wilson',
      email: 'sarah@company.com',
      loginTime: '32 minutes ago',
    },
    {
      id: '3',
      userName: 'Amit Verma',
      email: 'amit@company.com',
      loginTime: '47 minutes ago',
    },
  ]);

  readonly auditEvents = signal<AuditEvent[]>([
    {
      id: '1',
      action: 'User Created',
      actor: 'Admin',
      severity: 'info',
      timestamp: '2 min ago',
      module: 'Identity',
    },
    {
      id: '2',
      action: 'Role Updated',
      actor: 'Security Team',
      severity: 'warning',
      timestamp: '8 min ago',
      module: 'Access Control',
    },
    {
      id: '3',
      action: 'Permission Removed',
      actor: 'System',
      severity: 'error',
      timestamp: '14 min ago',
      module: 'Policy Engine',
    },
    {
      id: '4',
      action: 'Session Revoked',
      actor: 'Risk Monitor',
      severity: 'info',
      timestamp: '21 min ago',
      module: 'Sessions',
    },
  ]);
}
