import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { APP_ICONS } from '../../../../shared/icons/font-awesome.icons';
import { EntityWorkspaceTemplate } from '../../../../shared/ui/entity-workspace/models/entity-workspace-template.model';
import { decodeAccessRights } from '../../../../core/authorization/utils/access-rights.util';
import { AppModuleDemo, ModuleCategory } from '../app-module.model';
import { availableRightsCount, rolesGrantedCount } from '../module.util';

const CATEGORY_ICON: Record<ModuleCategory, IconDefinition> = {
  Administration: APP_ICONS.userShield,
  Security: APP_ICONS.security,
  Reports: APP_ICONS.chart,
  Settings: APP_ICONS.settings,
  Core: APP_ICONS.home,
};

function eventIcon(event: string): IconDefinition {
  const e = event.toLowerCase();
  if (e.includes('right') || e.includes('permission')) return APP_ICONS.key;
  if (e.includes('role')) return APP_ICONS.roles;
  if (e.includes('activat') || e.includes('deactivat') || e.includes('status')) return APP_ICONS.security;
  if (e.includes('created')) return APP_ICONS.create;
  return APP_ICONS.modules;
}

export const MODULE_WORKSPACE_TEMPLATE: EntityWorkspaceTemplate<AppModuleDemo> = {
  title: (module) => module.name,
  subtitle: (module) => module.description,
  status: (module) => module.category,
  statusVariant: () => 'info',

  metadata: (module) => [
    { label: 'Roles Granted', value: rolesGrantedCount(module), icon: APP_ICONS.roles },
    { label: 'Configurable Rights', value: availableRightsCount(module), icon: APP_ICONS.key },
    { label: 'Category', value: module.category, icon: CATEGORY_ICON[module.category] },
    {
      label: 'Status',
      value: module.status,
      icon: APP_ICONS.security,
      variant: module.status === 'Active' ? 'success' : 'warning',
    },
  ],

  sections: [
    {
      id: 'overview',
      title: 'Overview',
      description: 'Core module identity information',
      icon: APP_ICONS.modules,
      type: 'overview',
      overview: (module) => ({
        fields: [
          { label: 'Module Name', value: module.name },
          { label: 'Category', value: module.category },
          { label: 'Description', value: module.description },
          { label: 'Route Path', value: module.routePath },
          { label: 'Status', value: module.status },
        ],
      }),
    },

    {
      id: 'access-rights',
      title: 'Access Rights',
      description: 'Rights available and granted by default for this module',
      icon: APP_ICONS.key,
      type: 'fields',
      fields: (module) => [
        { label: 'Configurable Rights', value: decodeAccessRights(module.availableAccessRights) },
        { label: 'Default Rights', value: decodeAccessRights(module.defaultAccessRights) },
      ],
    },

    {
      id: 'assigned-roles',
      title: 'Assigned Roles',
      description: 'Roles that currently have access to this module',
      icon: APP_ICONS.roles,
      type: 'fields',
      fields: (module) =>
        module.rolesGranted.map((grant) => ({
          label: `${grant.roleName} (${grant.roleType})`,
          value: decodeAccessRights(grant.accessRights),
        })),
    },

    {
      id: 'activity',
      title: 'Recent Activity',
      description: 'Latest audit events for this module',
      icon: APP_ICONS.audit,
      type: 'timeline',
      timeline: (module) =>
        module.auditEvents.map((event, index) => ({
          id: `${index}`,
          title: event,
          icon: eventIcon(event),
          timestamp:
            index === 0 ? '5 minutes ago' : index === 1 ? 'Yesterday' : `${index + 1} days ago`,
        })),
    },
  ],
};
