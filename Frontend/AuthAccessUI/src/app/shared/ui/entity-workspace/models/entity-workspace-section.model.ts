import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { DetailField } from '../../components/details/detail-field-list/detail.field.model';

export type EntityWorkspaceSectionType = 'fields' | 'stat-grid' | 'timeline' | 'overview';

export interface WorkspaceOverviewItem {
  label: string;
  value: string | number;
}

export type SectionColorVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';

export interface EntityWorkspaceSection<T> {
  id: string;
  title: string;
  description?: string;
  defaultExpanded?: boolean;
  pinned?: boolean;
  icon?: IconDefinition;
  colorVariant?: SectionColorVariant;
  type: EntityWorkspaceSectionType;
  fields?: (entity: T) => any[];
  stats?: (entity: T) => any[];
  timeline?: (entity: T) => any[];
  overview?: (entity: T) => {
    stats?: WorkspaceOverviewItem[];
    fields: DetailField[];
  };
}
