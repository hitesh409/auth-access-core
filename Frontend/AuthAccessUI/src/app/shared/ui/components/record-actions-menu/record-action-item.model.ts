import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface RecordActionItem {
  label: string;
  icon?: IconDefinition;
  danger?: boolean;
  action: () => void;
}
