import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  IBaseTableColumn,
  IBaseTableFilter,
  IBaseTableServicePagination,
  BaseTableComponent,
} from '@cikrf/gas-components';
import { tableColumns, tableData } from './mock';

@UntilDestroy()
@Component({
  selector: 'app-plot-boundaries-table',
  templateUrl: './plot-boundaries.component.html',
  styleUrls: ['./plot-boundaries.component.scss'],
})
export class PlotBoundariesComponent {
  @ViewChild(BaseTableComponent)
  public baseTableComponent!: BaseTableComponent;

  public tableData: Array<any> = tableData;

  public pagination!: IBaseTableServicePagination;

  public tableColumns: IBaseTableColumn[] = tableColumns;

  public tableFilters?: Array<IBaseTableFilter> = undefined;

  public loading = false;

  public constructor(public router: Router) {}
}
