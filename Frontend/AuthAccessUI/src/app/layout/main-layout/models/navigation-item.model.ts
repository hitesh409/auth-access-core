export interface NavigationItem {
  label: string;
  icon?: string;
  route?: string;
  children?: NavigationItem[];
  permissions?: string[];
  hidden?: boolean;
}