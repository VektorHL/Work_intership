import { Component, OnInit } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { map, take } from 'rxjs/operators';
import {
  convertObjSchemaResponse,
  IBaseTableColumn,
  IBaseTableRow,
  IBaseTableServicePagination,
  IBaseTableServiceUpdateDataParams,
  MetaClassSchema,
  parseParamsForFilter,
} from '@cikrf/gas-components';
import { clone } from 'lodash';
import { Router } from '@angular/router';
import { EUserCommissionType, getUser, getUserCommissionType } from '@shared/utils/auth.utils';
import { plotsQuery } from '@/app/modules/tvd/components/plots-list/plotsQuery';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';
import { plotsTableColumns } from './plots-table.columns';
import { plotsTypes } from '@/app/modules/tvd/constants/plots-types.enum';
import { Plot } from '@/app/modules/tvd/models/plots';
import { Schema } from './default-schema';
import { EPlotType, plotTypeMap } from '@/app/modules/tvd/constants/plots-type.enum';
import { EPlotStatus } from '@/app/modules/tvd/components/plot-status/plot-status.component';

@Component({
  selector: 'app-candidate-form-buttons',
  templateUrl: './plots-list.component.html',
  styleUrls: ['./plots-list.component.scss'],
})
export class PlotsListComponent implements OnInit {
  public model!: IPlot[];

  public pagination: IBaseTableServicePagination = {
    perPage: 10,
    rowsNumber: 0,
  };

  public loading = false;

  public dataTypesMap = plotsTypes;

  public selectedArray: Array<any> = [];

  public tableColumns: IBaseTableColumn[] = plotsTableColumns;

  private _tableSchema: MetaClassSchema | null = null;

  public get filteredValue(): Array<IPlot> {
    return this.model;
  }

  public constructor(public router: Router, private apollo: Apollo) {}

  public ngOnInit(): void {
    this._tableSchema = convertObjSchemaResponse(Schema);
    this.fetchPlots();
  }

  public fetchPlots(params?: IBaseTableServiceUpdateDataParams) {
    const pagination = (params?.pagination as Required<IBaseTableServicePagination>) || {};
    const { page = 1, perPage = 10 } = pagination;
    const filter: Record<string, string | string[]> = {
      ...params?.filter,
    };

    let filterString: string = '';

    const user = getUser();
    if (user) {
      const type = getUserCommissionType(user);

      if (type === EUserCommissionType.IKSRF) {
        filter['subjectRF.SUBJCOD'] = user.profile.SUBJCOD;
      } else if (type === EUserCommissionType.TIK) {
        filter['std.STDID'] = user.profile.std;
      }

      filterString = `${parseParamsForFilter(filter)} or allowedStd.STDID=include=${user?.profile?.std}`;
    }

    const client = this.apollo.use('tvdClient').watchQuery<typeof Query>({
      query: plotsQuery({
        page,
        perPage,
        fulltext: params?.search
          ? `name=searchphrase='${params.search}', std.STDID=searchphrase='${params.search}'`
          : '',
        order: params?.sort ? { type: params.sort.sortDirection, field: params.sort.sortBy } : undefined,
        filter: filterString ?? parseParamsForFilter(filter),
      }),
    });
    client.valueChanges
      .pipe(take(1))
      .pipe(map((resp: { data: any }) => resp.data.PlotPaging))
      .subscribe((resp) => {
        this.model = resp.documents;
        this.pagination.rowsNumber = resp.total;
      });
  }

  public getPlotType({ value }: { value?: EPlotType }): string {
    return value ? plotTypeMap[value] : '';
  }

  public getTechnicals(row: Plot): string {
    const technicals = [];

    if (row?.electronicVoting) technicals.push('КЭГ');
    if (row?.bulletinTreatment) technicals.push('КОИБ');
    if (row?.qrCode) technicals.push('QR-код');
    if (row?.onlineTranslation) technicals.push('On-line трансляция');

    return technicals.join(', ');
  }

  public getStatus(data: Plot) {
    return data && data.isActive ? EPlotStatus.ACTIVE : EPlotStatus.ARCHIVE;
  }

  public onSelectedChange(e: Array<any>) {
    this.selectedArray = clone(e);
  }

  public checkPlot(id: string) {
    this.router.navigateByUrl(`/tvd/plots/${id}`);
  }

  public createPlot() {
    this.router.navigateByUrl('/tvd/plots/create');
  }

  public onRowClick(row: IBaseTableRow) {
    if (row.data?.id) this.checkPlot(row.data.id);
  }

  public isAllowedStd(plot: Plot): boolean {
    const user = getUser();
    if (user) {
      const type = getUserCommissionType(user);

      if (type === EUserCommissionType.TIK) {
        return plot.std.STDID !== user.profile.std;
      }
    }
    return false;
  }
}
