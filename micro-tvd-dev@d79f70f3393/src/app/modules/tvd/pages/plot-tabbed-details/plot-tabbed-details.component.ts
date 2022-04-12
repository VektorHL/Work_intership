import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IBaseNavigationTabs } from '@cikrf/gas-components';
import { plotFormListTabsBuilder } from '@config/tabs/builders/plot-form-list';
import { BehaviorSubject } from 'rxjs';
import { EPlotStatus } from '@/app/modules/tvd/components/plot-status/plot-status.component';

export interface IPlotTabbedDetailsInfo {
  createDate?: string | number;
  editDate?: string | number;
  std?: string;
  status?: EPlotStatus;
  loading?: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-plot-tabbed-details',
  templateUrl: './plot-tabbed-details.component.html',
  styleUrls: ['./plot-tabbed-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlotTabbedDetailsComponent implements OnInit {
  public loading: boolean = false;

  public passedButton: boolean = false;

  public createdPlotId: string | null = null;

  public tabs: Array<IBaseNavigationTabs> = [];

  public info$ = new BehaviorSubject<IPlotTabbedDetailsInfo>({
    createDate: '',
    editDate: '',
    std: '',
    status: EPlotStatus.ACTIVE,
    loading: true,
  });

  public ngOnInit(): void {
    this.tabs = plotFormListTabsBuilder();
  }

  private updateTopicHeader(title: string) {
    const topic = window?.EventBus?.getTopic('header');
    topic?.emit('setTitle', title);
  }
}
