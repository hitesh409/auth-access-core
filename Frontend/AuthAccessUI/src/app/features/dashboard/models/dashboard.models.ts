export interface DashboardMetric {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  statusVariant?: 'success' | 'warning' | 'error';
  displayAs?: 'value' | 'badge';
}

export interface RecentLogin {
  id: string;
  userName: string;
  email: string;
  loginTime: string;
}

export interface AuditEvent {
  id: string;
  action: string;
  actor: string;
  severity: 'info' | 'warning' | 'error';
  timestamp: string;
  module: string;
}
