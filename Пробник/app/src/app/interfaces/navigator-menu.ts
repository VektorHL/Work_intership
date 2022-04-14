import { NavigatorMenuBottomItem } from '@interfaces/navigator-menu-bottom-item';
import { NavigatorItem } from './navigator-item';

export interface NavigatorMenu {
  title?: string;
  subtitle?: string;
  items: NavigatorItem[];
  bottomItems?: NavigatorMenuBottomItem[];
}
