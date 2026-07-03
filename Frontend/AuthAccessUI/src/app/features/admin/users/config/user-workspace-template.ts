import { EntityWorkspaceTemplate } from '../../../../shared/ui/entity-workspace/models/entity-workspace-template.model';
import { UserDemo } from '../user-demo.model';
import { APP_ICONS } from '../../../../shared/icons/font-awesome.icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

function eventIcon(event: string): IconDefinition {
  const e = event.toLowerCase();
  if (e.includes('login') || e.includes('logged')) return APP_ICONS.signin;
  if (e.includes('password'))                        return APP_ICONS.key;
  if (e.includes('role') || e.includes('permission')) return APP_ICONS.roles;
  if (e.includes('lock') || e.includes('blocked'))   return APP_ICONS.lock;
  if (e.includes('security') || e.includes('risk'))  return APP_ICONS.security;
  if (e.includes('audit') || e.includes('report'))   return APP_ICONS.audit;
  if (e.includes('module') || e.includes('access'))  return APP_ICONS.modules;
  return APP_ICONS.profile;
}

export const USER_WORKSPACE_TEMPLATE: EntityWorkspaceTemplate<UserDemo> = {
  title: (user) => user.displayName,
  subtitle: (user) => user.roleName,
  status: (user) => user.status,
  statusVariant: (user) => {
    switch (user.status) {
      case 'Active':   return 'success';
      case 'Locked':   return 'error';
      case 'Pending':  return 'warning';
      default:         return 'neutral';
    }
  },

  metadata: (user) => [
    { label: 'Modules',       value: user.accessibleModules, icon: APP_ICONS.modules },
    {
      label: 'Risk Level', value: user.riskLevel, icon: APP_ICONS.security,
      variant: user.riskLevel === 'High' ? 'error' : user.riskLevel === 'Medium' ? 'warning' : 'success',
    },
    {
      label: 'Failed Logins', value: user.failedLoginAttempts, icon: APP_ICONS.info,
      variant: user.failedLoginAttempts === 0 ? 'success' : user.failedLoginAttempts >= 5 ? 'error' : 'warning',
    },
    { label: 'Last Login',    value: user.lastLogin, icon: APP_ICONS.signin },
  ],

  sections: [
    {
      id: 'identity',
      title: 'Identity',
      description: 'Core user identity information',
      icon: APP_ICONS.profile,
      type: 'overview',
      overview: (user) => ({
        fields: [
          { label: 'Display Name', value: user.displayName },
          { label: 'Email',        value: user.email },
          { label: 'Role',         value: user.roleName },
          { label: 'Last Updated', value: user.updatedAt },
        ],
      }),
    },

    {
      id: 'access',
      title: 'Access',
      description: 'Role and module assignments',
      icon: APP_ICONS.key,
      type: 'overview',
      overview: (user) => ({
        fields: [
          { label: 'Role Name',          value: user.roleName },
          { label: 'Access Mode',        value: user.accessMode },
          { label: 'Accessible Modules', value: user.accessibleModules },
          { label: 'Role Updated',       value: user.roleUpdatedAt },
        ],
      }),
    },

    {
      id: 'security',
      title: 'Security',
      description: 'Security profile and risk information',
      icon: APP_ICONS.security,
      type: 'overview',
      overview: (user) => ({
        fields: [
          { label: 'Risk Level',      value: user.riskLevel },
          { label: 'Failed Logins',   value: user.failedLoginAttempts },
          { label: 'Password Changed', value: user.passwordChangedAt },
          { label: 'Account Status',  value: user.status },
        ],
      }),
    },

    {
      id: 'activity',
      title: 'Recent Activity',
      description: 'Latest audit and security events',
      icon: APP_ICONS.audit,
      type: 'timeline',
      timeline: (user) =>
        user.auditEvents.map((event, index) => ({
          id: `${index}`,
          title: event,
          icon: eventIcon(event),
          timestamp:
            index === 0 ? '5 minutes ago'
            : index === 1 ? 'Yesterday'
            : `${index + 1} days ago`,
        })),
    },
  ],
};
