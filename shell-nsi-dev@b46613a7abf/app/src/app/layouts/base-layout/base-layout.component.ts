import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Type,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { GasLayoutService, GasMenu, GasMenuService } from '@cikrf/gas-ui-kit';
import { LoadModulesService } from '@shared/services/load-modules.service';
import { NavigatorMenuService } from '@shared/services/navigator-menu.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent implements OnInit {
  @ViewChild('drawerMenu')
  public drawerMenuRef!: ElementRef;

  public headerRole: Type<any> | null = null;

  public isMenu$: Observable<boolean> = this.gasMenuService.meta$.pipe(
    map((meta: GasMenu.Meta) => Boolean(meta) && meta?.routes?.length > 0),
  );

  public topComponent$ = this.gasLayoutService.topComponent$;

  public headerBottomComponent$ = this.gasLayoutService.headerBottomComponent$;

  public botComponent$ = this.gasLayoutService.botComponent$;

  public constructor(
    private gasMenuService: GasMenuService,
    private gasLayoutService: GasLayoutService,
    private loadModulesService: LoadModulesService,
    private navMenuService: NavigatorMenuService,
    public ref: ChangeDetectorRef,
  ) {}

  public async ngOnInit() {
    this.navMenuService.actualRouteData$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(async (routeData) => {
        const test = await this.loadModulesService.loadHeaderRoleConfig();
        if (routeData?.name && test) {
          const config = test[routeData.name];
          this.headerRole = config?.component ?? null;
          this.ref.detectChanges();
        }
      });
  }
}
