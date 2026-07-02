import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ActivityTimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: IconDefinition;
}
