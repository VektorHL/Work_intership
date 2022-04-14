import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigatorMenuService } from '@shared/services/navigator-menu.service';
import { UtilToolbarComponent } from 'src/app/components/util-toolbar/util-toolbar.component';
import { RouterService } from '@shared/services/router.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements AfterViewInit, OnDestroy {
  public constructor(private navigatorMenuService: NavigatorMenuService, private routerService: RouterService) {}

  public ngAfterViewInit(): void {
    this.routerService.initSubscribe();
    this.navigatorMenuService.addToolbarComponent(UtilToolbarComponent);
    this.navigatorMenuService.updateToolbar();
  }

  public ngOnDestroy(): void {
    this.routerService.unsubscribe();
  }
}
