import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
export interface GridAction<T = unknown> {
  label: string;
  icon?: IconDefinition;
  type?: 'primary' | 'secondary';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  action: (row: T) => void;
}