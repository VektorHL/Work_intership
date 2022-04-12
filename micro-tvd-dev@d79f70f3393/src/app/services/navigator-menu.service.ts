import { ComponentRef, Injectable } from '@angular/core';
import { GasHeaderService } from '@cikrf/gas-ui-kit';
import { ActivatedRoute, ActivatedRouteSnapshot, Data, Event, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class NavigatorMenuService {
  public actualRouteData$ = new BehaviorSubject<Data | null>(null);

  private routerEvent$: Observable<Event> | null = null;

  private componentRef?: ComponentRef<any>;

  public get actualComponentRef() {
    return this.componentRef;
  }

  public constructor(
    public router: Router,
    public actualRoute: ActivatedRoute,
    public gasHeaderService: GasHeaderService,
  ) {
    this.routerEvent$ = this.router.events.pipe(
      untilDestroyed(this),
      filter((event) => event instanceof NavigationEnd),
    );

    this.routerEvent$
      .pipe(
        untilDestroyed(this),
        map(() => this.actualRoute.snapshot),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      )
      .subscribe((route: ActivatedRouteSnapshot) => {
        this.gasHeaderService.title = route.data.label ?? '';
        this.actualRouteData$.next(route.data);
        this.updateToolbar();
      });
  }

  public updateToolbar() {
    if (this.actualComponentRef) {
      this.actualComponentRef?.instance.detectChanges();
    }
  }

  public addToolbarComponent(container: any) {
    this.componentRef = this.gasHeaderService.createComponent(container);
  }
}
