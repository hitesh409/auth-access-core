import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type DetailFieldVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface DetailField {
  label: string;
  value: string | number | null;
  icon?: IconDefinition;
  badge?: boolean;
  variant?: DetailFieldVariant;
}
