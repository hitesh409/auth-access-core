import { NavigationItem } from './navigation-items.model';

export interface FlyoutState {
  activeParent: NavigationItem | null;
  isOpen: boolean;
}
