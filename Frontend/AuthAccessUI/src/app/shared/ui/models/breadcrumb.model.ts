import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface BreadcrumbItem {
  label: string;
  icon?: IconDefinition;
  route?: string;
}