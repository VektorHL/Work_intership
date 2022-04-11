import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ReplaySubject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigatorItem } from '@interfaces/navigator-item';
import { navigatorMenuConfig } from '../../navigator-menu-config';
import { microFrontends } from '../../../micro-frontends';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private routeRoot = '';

  private subscriber$?: Subscription;

  private destroy$?: ReplaySubject<any>;

  private navigatorItemsList: Array<NavigatorItem | undefined> = [];

  public constructor(public router: Router, public route: ActivatedRoute) {
    this.navigatorItemsList = navigatorMenuConfig.items.flatMap((item) => item.childs!);
  }

  public getRouteRoot(): string {
    return this.routeRoot;
  }

  public initSubscribe(): void {
    this.destroy$ = new ReplaySubject(1);
    this.subscriber$ = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        takeUntil(this.destroy$),
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          const matchedMfeByNewRoute = microFrontends.find((mfe) => event.url.includes(mfe.routePath));
          const matchedMfeByCurrentRoute = microFrontends.find((mfe) => this.router.url.includes(mfe.routePath));
          this.routeRoot = matchedMfeByNewRoute?.routePath || matchedMfeByCurrentRoute?.routePath || '';
          if (!event.url.includes(this.routeRoot)) {
            this.router.navigateByUrl(this.routeRoot + event.url);
          }
        }
      });
  }

  public unsubscribe(): void {
    this.destroy$?.next();
    this.destroy$?.complete();
  }

  public setRouteRoot(root: string): void {
    this.routeRoot = root;
  }
}
