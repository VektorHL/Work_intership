import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Type, OnInit } from '@angular/core';
import { ToolbarConfig } from '@interfaces/toolbar-config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { LoadModulesService } from '../../shared/services/load-modules.service';
import { NavigatorMenuService } from '../../shared/services/navigator-menu.service';

@UntilDestroy()
@Component({
  selector: 'app-util-toolbar',
  templateUrl: './util-toolbar.component.html',
  styleUrls: ['./util-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilToolbarComponent implements OnInit {
  public component: Type<any> | null = null;

  private loadedToolbarConfig: ToolbarConfig = {};

  private routeName = '';

  public constructor(
    public el: ElementRef,
    public changeDetectorRef: ChangeDetectorRef,
    private loadModulesService: LoadModulesService,
    private navMenuService: NavigatorMenuService,
  ) {
    this.loadedToolbarConfig = this.loadModulesService.toolbarConfig;
  }

  public ngOnInit(): void {
    this.navMenuService.actualRouteData$
      .asObservable()
      .pipe(
        untilDestroyed(this),
        concatMap((routeData) => {
          if (routeData?.name && this.loadModulesService.toolbarConfig) {
            this.routeName = routeData.name;
            return this.loadModulesService.loadToolbarConfig$();
          }
          return of(this.loadModulesService.toolbarConfig);
        }),
      )
      .subscribe((config) => {
        this.loadedToolbarConfig = config;
        this.component = config[this.routeName]?.component ?? null;
        this.detectChanges();
      });
  }

  public detectChanges() {
    this.changeDetectorRef.detectChanges();
  }
}
