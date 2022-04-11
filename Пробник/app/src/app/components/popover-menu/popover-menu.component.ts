/* eslint-disable no-underscore-dangle */
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { GasClickOutsideDirective, GasDynamicBaseComponent, GasMenu } from '@cikrf/gas-ui-kit';
import { NavigatorMenuService } from '@shared/services/navigator-menu.service';
import { RouterService } from '@shared/services/router.service';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GasClickOutsideDirective],
})
// eslint-disable-next-line prettier/prettier
export class PopoverMenuComponent extends GasDynamicBaseComponent<void> implements AfterViewChecked
{
  public styleFixed: boolean = false;

  public menuItem: GasMenu.Route | null = null;

  private _parentRef!: ElementRef;

  @Input()
  public set parentRef(value: ElementRef) {
    this._parentRef = value;
  }

  public get hasChildRoutes(): boolean {
    return !!this.menuItem?.childs?.length;
  }

  public constructor(
    public el: ElementRef,
    public gasClickOutsideDirective: GasClickOutsideDirective,
    public renderer: Renderer2,
    private navigatorMenuService: NavigatorMenuService,
    private routerService: RouterService,
  ) {
    super(el, gasClickOutsideDirective, renderer);
  }

  public ngAfterViewChecked() {
    if (!this.styleFixed && this.hasChildRoutes) {
      this.correctPopupPosition();
      this.styleFixed = true;
    }
  }

  public isRouteActive(route: GasMenu.Route): boolean {
    return route.route === this.navigatorMenuService.currentActiveRoute;
  }

  public goToRoute(event: MouseEvent, routeItem: GasMenu.Route) {
    event.stopPropagation();
    this.routerService.setRouteRoot(String(this.menuItem?.route));
    this.navigatorMenuService.goToPage(routeItem.route);
  }

  private correctPopupPosition() {
    const { innerHeight } = window;
    const popupRect: ClientRect | null = this.el?.nativeElement?.getBoundingClientRect();
    const parentRect: ClientRect | null = this._parentRef?.nativeElement?.getBoundingClientRect();
    if (popupRect && parentRect) {
      const hasPlaceInBottom = popupRect.height + parentRect.top < innerHeight;
      if (hasPlaceInBottom) {
        this.el.nativeElement.style.top = `${parentRect.top}px`;
      } else {
        const deltaHeight = parentRect.top + popupRect.height - innerHeight;
        this.el.nativeElement.style.top = parentRect.top - deltaHeight;
      }
    }
  }
}
