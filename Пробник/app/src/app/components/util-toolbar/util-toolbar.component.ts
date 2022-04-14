import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Type,
  OnInit,
} from '@angular/core';
import { ToolbarConfig } from '@interfaces/toolbar-config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
      .pipe(untilDestroyed(this))
      .subscribe(async (routeData) => {
        await this.loadModulesService.loadToolbarConfig();
        this.loadedToolbarConfig = this.loadModulesService.toolbarConfig;

        if (routeData?.name && this.loadedToolbarConfig) {
          const config = this.loadedToolbarConfig[routeData.name];
          // также можно сразу закинуть пропы и слушателей
          this.component = config?.component ?? null;
          this.detectChanges();
        }
      });
  }

  public detectChanges() {
    this.changeDetectorRef.detectChanges();
  }
}
