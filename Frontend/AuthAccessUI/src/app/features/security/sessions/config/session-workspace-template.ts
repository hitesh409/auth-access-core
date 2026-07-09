import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { APP_ICONS } from '../../../../shared/icons/font-awesome.icons';
import { EntityWorkspaceTemplate } from '../../../../shared/ui/entity-workspace/models/entity-workspace-template.model';
import { SessionDemo } from '../session-demo.model';
import { durationBetween, formatDateTime } from '../session.util';

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
    { label: 'Email', value: session.userEmail, icon: APP_ICONS.email },
    { label: 'Started', value: formatDateTime(session.startedAt), icon: APP_ICONS.signin },
    { label: 'Expires', value: formatDateTime(session.expiresAt), icon: APP_ICONS.lock },
  ],

  sections: [

    {
      id: 'activity',
      title: 'Session Activity',
      description: 'Recent events for this session',
      icon: APP_ICONS.audit,
      type: 'timeline',
      defaultExpanded: false,
      timeline: (session) =>
        session.auditEvents.map((event, index) => ({
          id: `${index}`,
          title: event,
          icon: eventIcon(event),
          timestamp:
            index === 0 ? '5 minutes ago' : index === 1 ? 'Yesterday' : `${index + 1} days ago`,
        })),
    },

    {
      id: 'summary',
      title: 'Summary',
      icon: APP_ICONS.chart,
      type: 'stat-grid',
      stats: (session) => [
        { label: 'Session Length', value: durationBetween(session.startedAt, session.expiresAt) },
        { label: 'Events', value: session.auditEvents.length },
      ],
    },

    {
      id: 'connection',
      title: 'Connection',
      description: 'Where this session is connecting from',
      icon: APP_ICONS.security,
      type: 'fields',
      fields: (session) => [
        { label: 'Device', value: session.device, icon: APP_ICONS.device },
        { label: 'IP Address', value: session.ipAddress, icon: APP_ICONS.circleInfo },
        { label: 'Location', value: session.location, icon: APP_ICONS.security },
      ],
    },

    {
      id: 'details',
      title: 'Details',
      description: 'Identifiers and timestamps',
      icon: APP_ICONS.circleInfo,
      type: 'overview',
      overview: (session) => ({
        fields: [
          { label: 'Session ID', value: session.id },
          { label: 'Email', value: session.userEmail },
          { label: 'Started', value: formatDateTime(session.startedAt) },
          { label: 'Last Activity', value: formatDateTime(session.lastActivityAt) },
          { label: 'Expires', value: formatDateTime(session.expiresAt) },
        ],
      }),
    },
  ],
};
