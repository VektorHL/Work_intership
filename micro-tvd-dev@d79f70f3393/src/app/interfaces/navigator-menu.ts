import { GasMenu } from '@cikrf/gas-ui-kit';
import { NavigatorItem } from '@interfaces/navigator-item';

export interface NavigatorMenu {
  title?: string;
  subtitle?: string;
  items: NavigatorItem[];
  bottomItems?: GasMenu.Bottom[];
}
