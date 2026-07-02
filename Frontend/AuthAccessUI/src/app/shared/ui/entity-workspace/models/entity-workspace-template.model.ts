import { EntityWorkspaceAction } from './entity-workspace-action.model';
import { EntityWorkspaceSection } from './entity-workspace-section.model';

import { BadgeVariant } from '../../models/badge.model';
import { DetailHeaderMetadata } from '../../components/details/detail-header/detail-header';

export interface EntityWorkspaceTemplate<T> {
  title: (entity: T) => string;
  subtitle?: (entity: T) => string;
  status?: (entity: T) => string;
  statusVariant?: (entity: T) => BadgeVariant;
  metadata?: (entity: T) => DetailHeaderMetadata[];
  sections: EntityWorkspaceSection<T>[];
  actions?: EntityWorkspaceAction<T>[];
}
