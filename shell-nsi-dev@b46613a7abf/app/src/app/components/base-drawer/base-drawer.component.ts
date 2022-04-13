import { Component, ChangeDetectionStrategy, ElementRef, Host } from '@angular/core';
import { GasClickOutsideDirective, GasMenu, GasMenuService } from '@cikrf/gas-ui-kit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavigatorMenuBottomItem } from '@interfaces/navigator-menu-bottom-item';
import { ENavigationMenuItems } from '../../constants/navigation-menu-items.enum';

@UntilDestroy()
@Component({
  selector: 'app-base-drawer',
  templateUrl: './base-drawer.component.html',
  styleUrls: ['./base-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GasClickOutsideDirective],
})
export class BaseDrawerComponent {
  public meta$: Observable<GasMenu.Meta> = this.gasMenuService.meta$;

  public bottomButtons$: Observable<GasMenu.Bottom[]> = this.gasMenuService.bottomButtons$;

  public userData$: Observable<GasMenu.User> = this.gasMenuService.userData$;

  public activeRoute$: Observable<string> = this.gasMenuService.activeRoute$;

  public expandedChild$ = new BehaviorSubject<Record<string, boolean>>({});

  public isExpandedSubject$ = new BehaviorSubject<boolean>(false);

  public hoveredItemIndex: number = -1;

  public showUserInfoModal = false;

  public isExpanded$ = this.isExpandedSubject$.pipe(
    tap((isExpanded: boolean) => {
      const element: HTMLElement = this.elementRef.nativeElement;

      if (isExpanded) {
        element.classList.add('_expanded');
      } else {
        element.classList.remove('_expanded');
      }
    }),
  );

  public constructor(
    @Host() public gasClickOutsideDirective: GasClickOutsideDirective,
    private gasMenuService: GasMenuService,
    private elementRef: ElementRef,
  ) {
    this.gasClickOutsideDirective.handleClick$.pipe(untilDestroyed(this)).subscribe(() => this.handleOutside());
  }

  public toggleExpanded(): void {
    this.isExpandedSubject$.next(!this.isExpandedSubject$.value);
  }

  public handleOutside(): void {
    if (this.isExpandedSubject$.value) {
      this.toggleExpanded();
    }
  }

  public executeBottomButton(button: NavigatorMenuBottomItem): void {
    const isUserInfoButton = button.name === ENavigationMenuItems.USER_INFO;
    if (isUserInfoButton) {
      this.showUserInfoModal = true;
      return;
    }
    if (button.hideMenuWhenClicked) {
      this.toggleExpanded();
    }
    button.callback();
  }

  public isExpandedRoute(route: GasMenu.Route, activeRouteUrl: string | null): boolean {
    return this.expandedChild$.value[route.route] || this.isActiveRoute(route, activeRouteUrl);
  }

  public isActiveRoute(route: GasMenu.Route, activeRouteUrl: string | null): boolean {
    const isInitialRoute = activeRouteUrl === '/' && route.route === '/';
    const isPartialOrExactRoute = this.hasActiveInRoute(route, activeRouteUrl)
      ? this.isPartialChildRoute(route, activeRouteUrl)
      : this.isExactRoute(route, activeRouteUrl);
    const isActiveRoute = this.gasMenuService.isActiveRoute(route.route, route.route === '/');

    return isInitialRoute || isActiveRoute || isPartialOrExactRoute || !!route.active;
  }

  public toggleChild(url: string): void {
    const expanded = this.expandedChild$.value;

    if (expanded[url]) {
      expanded[url] = !expanded[url];
    } else {
      expanded[url] = true;
    }

    this.expandedChild$.next(expanded);
  }

  public checkUserDataClick(userData?: GasMenu.User | null) {
    if (!userData?.isLoading && userData?.logoutCallback) {
      userData.logoutCallback();
    }
  }

  public logOut(): void {
    window.authService.logout();
  }

  /** Доработать рекурсию, чтоб можно было искать активных в глубине более чем на одного ребенка */
  private hasActiveInRoute(route: GasMenu.Route, activeRouteUrl: string | null): boolean {
    if (!route.childs) {
      return false;
    }

    const hasActiveRoute =
      route.childs.find((innerRoute: GasMenu.Route) => innerRoute.route === activeRouteUrl) !== undefined;

    if (hasActiveRoute) {
      return true;
    }

    return false;
  }

  private isExactRoute(route: GasMenu.Route, activeRouteUrl: string | null): boolean {
    return activeRouteUrl === route.route;
  }

  private isPartialChildRoute(route: GasMenu.Route, activeRouteUrl: string | null): boolean {
    return !!activeRouteUrl && activeRouteUrl.indexOf(route.route) > -1 && route.route !== '/';
  }
}
