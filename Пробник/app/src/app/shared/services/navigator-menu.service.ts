import { ComponentRef, Injectable } from '@angular/core';
import {
  GasMenuService,
  GasHeaderService,
  GasMenu,
  GasIcon,
  GasBreadcrumb,
} from '@cikrf/gas-ui-kit';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Data,
  Event,
  NavigationEnd,
  Router,
} from '@angular/router';
import { navigatorMenuConfig } from 'src/app/navigator-menu-config';
import { filter, map } from 'rxjs/operators';
import { NavigatorMenu } from '@interfaces/navigator-menu';
import { NavigatorItem } from '@interfaces/navigator-item';
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

  private drawerTitle: string = '';

  private drawerSubtitle: string = '';

  private activeRoute: string = '';

  private static readonly ERROR_URL: string = '/error';

  private static readonly INITIAL_URL: string = '/';

  public get actualDrawerTitle(): string {
    return this.drawerTitle;
  }

  public get actualDrawerSubtitle(): string {
    return this.drawerSubtitle;
  }

  public get currentActiveRoute(): string {
    return this.activeRoute;
  }

  public get actualComponentRef() {
    return this.componentRef;
  }

  public constructor(
    public router: Router,
    public actualRoute: ActivatedRoute,
    private gasMenuService: GasMenuService,
    private gasHeaderService: GasHeaderService,
  ) {
    this.setNavigatorMenuMeta(navigatorMenuConfig);

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
        this.actualRouteData$.next(route.data);
      });

    this.routerEvent$?.subscribe((event: any) => {
      const eventUrlAfterRedirect = event.urlAfterRedirects;
      if (eventUrlAfterRedirect !== NavigatorMenuService.ERROR_URL) {
        const isRedirectFromInitialUrl =
          event.url === NavigatorMenuService.INITIAL_URL && event.url !== eventUrlAfterRedirect;
        const isActiveRouteInitial =
          this.gasMenuService.activeRoute === NavigatorMenuService.INITIAL_URL;
        const isRedirectToMenuItem = !!this.findMenuItemByRouteUrl(eventUrlAfterRedirect);
        this.gasMenuService.activeRoute =
          isActiveRouteInitial || isRedirectFromInitialUrl || isRedirectToMenuItem
            ? eventUrlAfterRedirect
            : this.gasMenuService.activeRoute;

        const routeSnapshot = this.actualRoute.parent?.snapshot;
        console.log('this.actualRoute.snapshot', this.actualRoute.snapshot);
        this.generateBreadcrumbs(this.actualRoute.snapshot);

        // const menuItem = this.findMenuItemByRouteUrl(this.gasMenuService.activeRoute);
        // if (menuItem) {
        // this.gasHeaderService.setTitle(' ');
        // this.gasHeaderService.setTitle('SUBTITLE');
        this.gasHeaderService.setIcon(routeSnapshot?.data?.icon ?? GasIcon.Common.KnowledgeBase);
        this.gasHeaderService.iconClass = 'menu-icon';
        this.activeRoute = this.gasMenuService.activeRoute;
        // }
      }
    });
  }

  public updateToolbar() {
    if (this.actualComponentRef) {
      this.actualComponentRef?.instance.detectChanges();
    }
  }

  public setNavigatorMenuMeta(metaConfig: NavigatorMenu) {
    const vm = this;
    this.gasMenuService.meta = {
      title: metaConfig.title || '',
      subtitle: metaConfig.subtitle || '',
      routes: metaConfig.items.map((item) => this.mapMenuItemToRoute(item, vm)) || [],
    };
    this.setDrawerBottomButtons(metaConfig?.bottomItems);
    this.drawerTitle = metaConfig.title || '';
    this.drawerSubtitle = metaConfig.subtitle || '';
  }

  public setDrawerTitle(title: string = '') {
    this.drawerTitle = title;
    this.gasMenuService.meta.title = title;
  }

  public setDrawerSubtitle(subTitle: string = '') {
    this.drawerSubtitle = subTitle;
    this.gasMenuService.meta.subtitle = subTitle;
  }

  public goToPage(pageRoute: string) {
    this.gasMenuService.activeRoute = pageRoute;
    this.router.navigate([pageRoute]);
  }

  public setDrawerBottomButtons(bottomButtons: GasMenu.Bottom[] = []) {
    this.gasMenuService.bottomButtons = bottomButtons;
  }

  public addToolbarComponent(container: any) {
    this.componentRef = this.gasHeaderService.createComponent(container);
  }

  private generateBreadcrumbs(route: ActivatedRouteSnapshot) {
    const breadcrumbs: GasBreadcrumb[] = [];

    this.addRouteToBreadcrumbsIfCorrect(route, breadcrumbs);

    // if (routeNames.length > 1) {
    //   let itemRoute = '';
    //   routeNames.forEach((item) => {
    //     itemRoute += `/${item}`;
    //     const currentMenuItem = this.findMenuItemByRouteUrl(itemRoute);
    //     const breadcrumbItem: GasBreadcrumb = {
    //       title: currentMenuItem?.title ?? '',
    //       callback: () => {
    //         if (currentMenuItem?.route) this.goToPage(currentMenuItem.route);
    //       },
    //     };
    //     breadcrumbs.push(breadcrumbItem);
    //   });
    // }

    this.gasHeaderService.setBreadcrumbs(breadcrumbs);
  }

  private addRouteToBreadcrumbsIfCorrect(
    route: ActivatedRouteSnapshot,
    breadcrumbs: GasBreadcrumb[],
  ) {
    console.warn('route', route);
    if (route.data?.name && route.data?.label && route.url.length) {
      const breadcrumbItem = {
        title: route.data.label,
        callback: () => {
          const excludeRoute = route.url.map((segment) => segment.path).join('/');
          const activeRoute = window.location.pathname;
          const newRoute = activeRoute
            .replace(window.env.APP_PROJECT_PATH, '')
            .replace(new RegExp(`${excludeRoute}.*`), excludeRoute);
          // TODO не navigate а popBackStack или как там его в ангуляре
          this.router.navigate([newRoute]);
          // this.goToPage()
        },
      };
      console.log('addRouteToBreadcrumbsIfCorrect adding', breadcrumbItem);
      breadcrumbs.push(breadcrumbItem);
    } else {
      const path = route.routeConfig?.path ?? '';
      const menuItem = this.findMenuItemByRouteUrl(`/${path}`);
      if (menuItem) {
        breadcrumbs.push({
          title: menuItem?.title ?? '-',
          callback: () => {
            // this.goToPage()
          },
        });
      }
    }
    route.children.forEach((childRoute) => {
      this.addRouteToBreadcrumbsIfCorrect(childRoute, breadcrumbs);
    });
  }

  private findMenuItemByRouteUrl(routeUrl: string): GasMenu.Route | undefined {
    const vm = this;
    const menuRouteItems = this.gasMenuService.meta.routes;
    return this.filterRoutes(menuRouteItems, vm, (menuItem) => menuItem.route === routeUrl)[0];
  }

  private filterRoutes(
    routes: GasMenu.Route[],
    vm: NavigatorMenuService,
    predicate: (routeItem: GasMenu.Route) => boolean,
  ) {
    const result: GasMenu.Route[] = [];

    routes.forEach((routeItem) => {
      if (predicate(routeItem)) {
        result.push(routeItem);
      }
      if (routeItem.childs?.length) {
        result.push(...vm.filterRoutes(routeItem.childs, vm, predicate));
      }
    });

    return result;
  }

  private mapMenuItemToRoute(menuItem: NavigatorItem, vm: NavigatorMenuService): GasMenu.Route {
    return {
      title: menuItem.title,
      icon: menuItem.icon,
      active: menuItem.active,
      disabled: menuItem.disabled,
      route: menuItem.route,
      childs: menuItem.childs?.map((item) => vm.mapMenuItemToRoute(item, vm)),
      callback: () => {
        if (menuItem.callbackMethod && typeof menuItem.callbackMethod === 'function') {
          menuItem.callbackMethod();
          console.warn('menu item callback method called');
        }
        vm.goToPage(menuItem.route);
      },
    };
  }
}
