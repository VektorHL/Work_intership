import { Component, OnInit } from '@angular/core';
import { IBaseNavigationTabs } from '@cikrf/gas-components';
import { tvdListTabsBuilder } from '@config/tabs/builders/tvd-list';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-tvd-card-main',
  templateUrl: './tvd-list-main.component.html',
  styleUrls: ['./tvd-list-main.component.scss'],
})
export class TvdListMainComponent implements OnInit {
  public tabs: Array<IBaseNavigationTabs> = [];

  public ngOnInit(): void {
    this.tabs = tvdListTabsBuilder();
    window?.EventBus?.getTopic('header')?.emit('setTitle', 'Территории и участки');
  }
}
