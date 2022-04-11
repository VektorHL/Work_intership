import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ReplaySubject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private routeRoot = '';

  private subscriber$?: Subscription;

  private destroy$?: ReplaySubject<any>;

  public getRouteRoot(): string {
    return this.routeRoot;
  }

  public constructor(public router: Router, public route: ActivatedRoute) {}

  public initSubscribe(): void {
    this.destroy$ = new ReplaySubject(1);
    this.subscriber$ = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        takeUntil(this.destroy$),
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart && !event.url.includes(this.routeRoot)) {
          this.router.navigateByUrl(this.routeRoot + event.url);
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
