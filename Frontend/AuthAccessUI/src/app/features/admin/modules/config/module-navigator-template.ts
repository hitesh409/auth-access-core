import { BadgeVariant } from '../../../../shared/ui/models/badge.model';
import { EntityNavigatorTemplate } from '../../../../shared/ui/entity-navigator/entity-navigator-template.model';
import { AppModuleDemo, ModuleCategory } from '../app-module.model';
import { availableRightsCount, rolesGrantedCount } from '../module.util';

const CATEGORY_VARIANT: Record<ModuleCategory, BadgeVariant> = {
  Administration: 'info',
  Security: 'error',
  Reports: 'success',
  Settings: 'neutral',
  Core: 'warning',
};

export const MODULE_NAVIGATOR_TEMPLATE: EntityNavigatorTemplate<AppModuleDemo> = {
  entityLabel: 'Modules',
  filters: [
    { label: 'All', value: 'all' },
    { label: 'Administration', value: 'administration' },
    { label: 'Security', value: 'security' },
    { label: 'Reports', value: 'reports' },
    { label: 'Settings', value: 'settings' },
    { label: 'Core', value: 'core' },
  ],
  avatar: (module) =>
    module.name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join(''),
  title: (module) => module.name,
  subtitle: (module) => module.description,
  status: (module) => module.category,
  statusVariant: (module) => CATEGORY_VARIANT[module.category],
  metadata: (module) => [
    { label: 'roles', value: rolesGrantedCount(module) },
    { label: 'configurable rights', value: availableRightsCount(module) },
  ],
};
