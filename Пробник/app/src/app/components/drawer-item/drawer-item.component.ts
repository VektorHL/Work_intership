import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { GasMenu, GasPositioning } from '@cikrf/gas-ui-kit';
import { RouterService } from '@shared/services/router.service';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';

@Component({
  selector: 'app-drawer-item',
  templateUrl: './drawer-item.component.html',
  styleUrls: ['./drawer-item.component.scss'],
})
export class DrawerItemComponent implements OnInit {
  @Input()
  public routeItem: GasMenu.Route | null = null;

  @Input()
  public active: string | boolean = false;

  @ViewChild('navigationElement', { static: true, read: ElementRef })
  public navElement!: ElementRef;

  public popupPosition = [GasPositioning.Direction.Right];

  public popupComponent = PopoverMenuComponent;

  public constructor(private routerService: RouterService) {}

  public ngOnInit(): void {
    if (this.active) {
      this.routerService.setRouteRoot(String(this.routeItem?.route));
    }
  }

  public itemClickHandler(): void {
    this.routerService.setRouteRoot(String(this.routeItem?.route));
    this.routeItem?.callback();
  }
}
