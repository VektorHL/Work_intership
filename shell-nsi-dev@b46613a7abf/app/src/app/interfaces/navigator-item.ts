export interface NavigatorItem {
  title: string;
  route: string;
  name: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  childs?: NavigatorItem[];
  callbackMethod?: () => void;
}
