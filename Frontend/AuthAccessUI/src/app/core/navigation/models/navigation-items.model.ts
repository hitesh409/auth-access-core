import { RoutePermission } from "../../authorization/models/route-permission.model";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
export interface NavigationItem {
  id: number;
  label: string;
  icon?: IconDefinition;
  route?: string;
  permissions?: RoutePermission[];
  children?: NavigationItem[];
  expanded?: boolean;
}