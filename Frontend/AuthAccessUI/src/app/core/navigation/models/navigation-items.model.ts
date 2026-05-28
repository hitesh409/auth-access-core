import { RoutePermission } from "../../authorization/models/route-permission.model";

export interface NavigationItem {
  label: string;
  icon?: string;
  route?: string;
  permissions?: RoutePermission[];
  children?: NavigationItem[];
  expanded?: boolean;
}