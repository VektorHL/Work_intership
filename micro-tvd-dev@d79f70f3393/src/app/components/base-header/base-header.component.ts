import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { GasHeaderService } from '@cikrf/gas-ui-kit';
import { GasDynamicComponentsService } from '@cikrf/gas-utils/services';
import { NgAfterViewInit } from '@cikrf/gas-utils/decorators';
import { combineLatest, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Базовый компонент gas-header из gas-ui-kit,
 * где добавлена отписка от потока с компонентом при уничтожении gas-header
 */
@UntilDestroy()
@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss'],
})
export class BaseHeaderComponent {
  @NgAfterViewInit()
  public afterViewInit$!: Observable<void>;

  @ViewChild('containeRef', { read: ViewContainerRef })
  public containeRef!: ViewContainerRef;

  public title$ = this.gasHeaderService.title$;

  public subtitle$ = this.gasHeaderService.subtitle$;

  public icon$ = this.gasHeaderService.icon$;

  public iconColor$ = this.gasHeaderService.iconColor$;

  public iconClass$ = this.gasHeaderService.iconClass$;

  public breadcrumbs$ = this.gasHeaderService.breadcrumbs$;

  public component$ = this.gasHeaderService.component$;

  public constructor(
    private gasHeaderService: GasHeaderService,
    private gasDynamicComponentService: GasDynamicComponentsService,
  ) {
    combineLatest([this.afterViewInit$, this.component$])
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const component = params[1];
        const componentRef = this.gasDynamicComponentService.createChildComponent(component, this.containeRef);

        componentRef.changeDetectorRef.detectChanges();
        this.gasHeaderService.setComponentRef(componentRef);
      });
  }
}
