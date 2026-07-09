import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { APP_ICONS } from '../../../../shared/icons/font-awesome.icons';
import { EntityWorkspaceTemplate } from '../../../../shared/ui/entity-workspace/models/entity-workspace-template.model';
import { TokenDemo } from '../token-demo.model';
import { durationBetween, formatDate, formatDateTime } from '../token.util';

function eventIcon(event: string): IconDefinition {
  const e = event.toLowerCase();
  if (e.includes('issue')) return APP_ICONS.key;
  if (e.includes('revoke') || e.includes('mfa')) return APP_ICONS.lock;
  if (e.includes('scope')) return APP_ICONS.security;
  if (e.includes('used') || e.includes('refresh')) return APP_ICONS.signin;
  if (e.includes('suspicious') || e.includes('expire')) return APP_ICONS.info;
  return APP_ICONS.key;
}

export const TOKEN_WORKSPACE_TEMPLATE: EntityWorkspaceTemplate<TokenDemo> = {
  title: (token) => token.name,
  subtitle: (token) => `${token.type} · ${token.client}`,
  status: (token) => token.status,
  statusVariant: (token) => {
    switch (token.status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'warning';
      default:
        return 'error';
    }
  },

  // Additive glance — owner + lifecycle, none of which the grid leads with.
  metadata: (token) => [
    { label: 'Owner', value: token.owner, icon: APP_ICONS.profile },
    { label: 'Issued', value: formatDate(token.issuedAt), icon: APP_ICONS.signin },
    { label: 'Expires', value: formatDate(token.expiresAt), icon: APP_ICONS.lock },
  ],

  sections: [
    // Timeline first — the one thing the grid can't show.
    {
      id: 'activity',
      title: 'Token Activity',
      description: 'Recent events for this token',
      icon: APP_ICONS.audit,
      type: 'timeline',
      timeline: (token) =>
        token.auditEvents.map((event, index) => ({
          id: `${index}`,
          title: event,
          icon: eventIcon(event),
          timestamp:
            index === 0 ? '3 minutes ago' : index === 1 ? 'Yesterday' : `${index + 1} days ago`,
        })),
    },

    // Stable, record-derived stats.
    {
      id: 'summary',
      title: 'Summary',
      icon: APP_ICONS.chart,
      type: 'stat-grid',
      stats: (token) => [
        { label: 'Requests', value: token.usageCount },
        { label: 'Valid For', value: durationBetween(token.issuedAt, token.expiresAt) },
        { label: 'Scopes', value: token.scopes.length },
      ],
    },

    // Scopes/access context — shown once (self-contained on mobile modal).
    {
      id: 'access',
      title: 'Scopes & Access',
      description: 'What this token is allowed to do and where it is used',
      icon: APP_ICONS.security,
      type: 'fields',
      fields: (token) => [
        { label: 'Scopes', value: token.scopes.join(', '), icon: APP_ICONS.security },
        { label: 'Client', value: token.client, icon: APP_ICONS.device },
        { label: 'Last Used IP', value: token.ipAddress, icon: APP_ICONS.circleInfo },
      ],
    },

    // Additive identifiers + timestamps.
    {
      id: 'details',
      title: 'Details',
      description: 'Identifiers and timestamps',
      icon: APP_ICONS.circleInfo,
      type: 'overview',
      overview: (token) => ({
        fields: [
          { label: 'Token ID', value: token.id },
          { label: 'Owner', value: token.owner },
          { label: 'Owner Email', value: token.ownerEmail },
          { label: 'Issued', value: formatDateTime(token.issuedAt) },
          { label: 'Last Used', value: formatDateTime(token.lastUsedAt) },
          { label: 'Expires', value: formatDateTime(token.expiresAt) },
        ],
      }),
    },
  ],
};
