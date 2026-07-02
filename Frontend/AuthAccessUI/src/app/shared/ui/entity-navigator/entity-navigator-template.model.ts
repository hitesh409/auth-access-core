import { BadgeVariant } from '../models/badge.model';

export interface EntityNavigatorMetadata {
  label: string;
  value: string | number;
}

export interface EntityNavigatorFilter {
  label: string;
  value: string;
}

export interface EntityNavigatorTemplate<T> {
  avatar?: (entity: T) => string;
  title: (entity: T) => string;
  subtitle?: (entity: T) => string;
  description?: (entity: T) => string;
  status?: (entity: T) => string;
  statusVariant?: (entity: T) => BadgeVariant;
  metadata?: (entity: T) => EntityNavigatorMetadata[];
  searchableText?: (entity: T) => string;
  group?: (entity: T) => string;
  entityLabel?: string;
  filters?: EntityNavigatorFilter[];
}
