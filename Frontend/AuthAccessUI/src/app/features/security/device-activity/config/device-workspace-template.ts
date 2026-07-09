import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { APP_ICONS } from '../../../../shared/icons/font-awesome.icons';
import { EntityWorkspaceTemplate } from '../../../../shared/ui/entity-workspace/models/entity-workspace-template.model';
import { DeviceDemo } from '../device-demo.model';
import { durationBetween, formatDate, formatDateTime } from '../device.util';

function eventIcon(event: string): IconDefinition {
  const e = event.toLowerCase();
  if (e.includes('trust')) return APP_ICONS.security;
  if (e.includes('block') || e.includes('mfa')) return APP_ICONS.lock;
  if (e.includes('sign-in') || e.includes('login') || e.includes('register')) return APP_ICONS.signin;
  if (e.includes('suspicious') || e.includes('failed') || e.includes('await')) return APP_ICONS.info;
  return APP_ICONS.device;
}

export const DEVICE_WORKSPACE_TEMPLATE: EntityWorkspaceTemplate<DeviceDemo> = {
  title: (device) => device.deviceName,
  subtitle: (device) => `${device.type} · ${device.os}`,
  status: (device) => device.status,
  statusVariant: (device) => {
    switch (device.status) {
      case 'Trusted':
        return 'success';
      case 'Pending':
        return 'warning';
      default:
        return 'error';
    }
  },

  // Additive glance — owner + lifecycle + risk, none of which the grid leads with.
  metadata: (device) => [
    { label: 'Owner', value: device.owner, icon: APP_ICONS.profile },
    { label: 'Registered', value: formatDate(device.firstSeenAt), icon: APP_ICONS.signin },
    { label: 'Risk', value: device.riskLevel, icon: APP_ICONS.security },
  ],

  sections: [
    // Timeline first — the one thing the grid can't show.
    {
      id: 'activity',
      title: 'Device Activity',
      description: 'Recent events for this device',
      icon: APP_ICONS.audit,
      type: 'timeline',
      timeline: (device) =>
        device.auditEvents.map((event, index) => ({
          id: `${index}`,
          title: event,
          icon: eventIcon(event),
          timestamp:
            index === 0 ? '2 minutes ago' : index === 1 ? 'Yesterday' : `${index + 1} days ago`,
        })),
    },

    // Stable, record-derived stats.
    {
      id: 'summary',
      title: 'Summary',
      icon: APP_ICONS.chart,
      type: 'stat-grid',
      stats: (device) => [
        { label: 'Active Sessions', value: device.activeSessions },
        { label: 'Known For', value: durationBetween(device.firstSeenAt, device.lastSeenAt) },
      ],
    },

    // Hardware/connection context — shown once (self-contained on mobile modal).
    {
      id: 'hardware',
      title: 'Hardware & Connection',
      description: 'What this device is and where it connects from',
      icon: APP_ICONS.device,
      type: 'fields',
      fields: (device) => [
        { label: 'Type', value: device.type, icon: APP_ICONS.device },
        { label: 'Operating System', value: device.os, icon: APP_ICONS.sessions },
        { label: 'Browser', value: device.browser, icon: APP_ICONS.circleInfo },
        { label: 'IP Address', value: device.ipAddress, icon: APP_ICONS.circleInfo },
        { label: 'Location', value: device.location, icon: APP_ICONS.security },
      ],
    },

    // Additive identifiers + timestamps.
    {
      id: 'details',
      title: 'Details',
      description: 'Identifiers and timestamps',
      icon: APP_ICONS.circleInfo,
      type: 'overview',
      overview: (device) => ({
        fields: [
          { label: 'Device ID', value: device.id },
          { label: 'Owner', value: device.owner },
          { label: 'Owner Email', value: device.ownerEmail },
          { label: 'Risk Level', value: device.riskLevel },
          { label: 'First Seen', value: formatDateTime(device.firstSeenAt) },
          { label: 'Last Seen', value: formatDateTime(device.lastSeenAt) },
        ],
      }),
    },
  ],
};
