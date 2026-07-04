import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { APP_ICONS } from '../../../../shared/icons/font-awesome.icons';
import { EntityWorkspaceTemplate } from '../../../../shared/ui/entity-workspace/models/entity-workspace-template.model';
import { SessionDemo } from '../session-demo.model';

function eventIcon(event: string): IconDefinition {
  const e = event.toLowerCase();
  if (e.includes('mfa') || e.includes('verified')) return APP_ICONS.lock;
  if (e.includes('start') || e.includes('login')) return APP_ICONS.signin;
  if (e.includes('revoke')) return APP_ICONS.lock;
  if (e.includes('expire')) return APP_ICONS.info;
  return APP_ICONS.sessions;
}

export const SESSION_WORKSPACE_TEMPLATE: EntityWorkspaceTemplate<SessionDemo> = {
  title: (session) => session.userName,
  subtitle: (session) => session.device,
  status: (session) => session.status,
  statusVariant: (session) => {
    switch (session.status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'warning';
      default:
        return 'neutral';
    }
  },

  metadata: (session) => [
    { label: 'Device', value: session.device, icon: APP_ICONS.device },
    { label: 'IP Address', value: session.ipAddress, icon: APP_ICONS.info },
    { label: 'Location', value: session.location, icon: APP_ICONS.security },
    { label: 'Last Activity', value: session.lastActivityAt, icon: APP_ICONS.signin },
  ],

  sections: [
    {
      id: 'overview',
      title: 'Overview',
      description: 'Session and connection details',
      icon: APP_ICONS.sessions,
      type: 'overview',
      overview: (session) => ({
        fields: [
          { label: 'User', value: session.userName },
          { label: 'Email', value: session.userEmail },
          { label: 'Device', value: session.device },
          { label: 'IP Address', value: session.ipAddress },
          { label: 'Location', value: session.location },
          { label: 'Started', value: session.startedAt },
          { label: 'Expires', value: session.expiresAt },
        ],
      }),
    },

    {
      id: 'activity',
      title: 'Session Activity',
      description: 'Recent events for this session',
      icon: APP_ICONS.audit,
      type: 'timeline',
      timeline: (session) =>
        session.auditEvents.map((event, index) => ({
          id: `${index}`,
          title: event,
          icon: eventIcon(event),
          timestamp:
            index === 0 ? '5 minutes ago' : index === 1 ? 'Yesterday' : `${index + 1} days ago`,
        })),
    },
  ],
};
