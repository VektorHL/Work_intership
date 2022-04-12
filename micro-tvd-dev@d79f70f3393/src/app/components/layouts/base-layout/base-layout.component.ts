import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { GasLayoutService, GasMenu, GasMenuService } from '@cikrf/gas-ui-kit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent {
  @ViewChild('drawerMenu')
  public drawerMenuRef!: ElementRef;

  public isMenu$: Observable<boolean> = this.gasMenuService.meta$.pipe(
    map((meta: GasMenu.Meta) => Boolean(meta) && meta?.routes?.length > 0),
  );

  public topComponent$ = this.gasLayoutService.topComponent$;

  public headerBottomComponent$ = this.gasLayoutService.headerBottomComponent$;

  public botComponent$ = this.gasLayoutService.botComponent$;

  public constructor(private gasMenuService: GasMenuService, private gasLayoutService: GasLayoutService) {}
}
