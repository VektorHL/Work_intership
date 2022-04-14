import { Type } from '@angular/core';

export interface ToolbarConfig {
  [routeName: string]: ToolbarItemConfig;
}

export interface ToolbarItemConfig {
  props?: any;
  component: Type<any>;
}
