import { Component, AfterViewInit } from '@angular/core';
import { NavigatorMenuService } from '../../../services/navigator-menu.service';
import { BaseHeaderActionsComponent } from '../../base-header-actions/base-header-actions.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements AfterViewInit {
  public constructor(private navigatorMenuService: NavigatorMenuService) {}

  public ngAfterViewInit(): void {
    this.navigatorMenuService.addToolbarComponent(BaseHeaderActionsComponent);
    this.navigatorMenuService.updateToolbar();
  }
}
