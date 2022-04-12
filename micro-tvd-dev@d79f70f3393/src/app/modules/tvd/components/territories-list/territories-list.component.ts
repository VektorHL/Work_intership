import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  IBaseTableColumn,
  IBaseTableServicePagination,
  IBaseTableServiceUpdateDataParams,
  convertObjSchemaResponse,
  MetaClassSchema,
  parseParamsForFilter,
  IBaseTableRow,
} from '@cikrf/gas-components';
import { clone } from 'lodash';
import { Apollo, Query } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { EUserCommissionType, getUser, getUserCommissionType } from '@shared/utils/auth.utils';
import { ITerritory } from '@/app/modules/tvd/types/territories.interface';

import { territoriesTableColumns } from './territories-table.columns';
import { territoriesTypes } from '@/app/modules/tvd/constants/territories-types.enum';
import { territoriesQuery } from './territoriesQuery';
import { TerritoriesActionsEnum } from '@/app/modules/tvd/constants/territories-header-actions.enum';
import { Schema } from '../territories-create-modal/create-schema';

@UntilDestroy()
@Component({
  selector: 'app-territories-list',
  templateUrl: './territories-list.component.html',
  styleUrls: ['./territories-list.component.scss'],
})
export class TerritoriesListComponent implements OnInit {
  public model!: ITerritory[];

  public pagination: IBaseTableServicePagination = {
    perPage: 10,
    rowsNumber: 0,
  };

  public dataTypesMap = territoriesTypes;

  public tableColumns: IBaseTableColumn[] = territoriesTableColumns;

  public loading = false;

  public selectedArray: Array<any> = [];

  public selectedTerritoryId: string = '';

  public territoryCreateModalVisible: boolean = false;

  private _tableSchema: MetaClassSchema | null = null;

  public get filteredValue(): Array<ITerritory> {
    return this.model;
  }

  public constructor(public router: Router, private apollo: Apollo) {}

  public ngOnInit(): void {
    this._tableSchema = convertObjSchemaResponse(Schema);
    this.fetchTerritories();
  }

  public fetchTerritories(params?: IBaseTableServiceUpdateDataParams) {
    const pagination = (params?.pagination as Required<IBaseTableServicePagination>) || {};
    const { page = 1, perPage = 10 } = pagination;
    const filter: Record<string, string | string[]> = {
      ...params?.filter,
    };
    const user = getUser();

    if (user && getUserCommissionType(user) !== EUserCommissionType.CIK) {
      filter['stdParent.STDID'] = user.profile.std;
    }

    const client = this.apollo.use('tvdClient').watchQuery<typeof Query>({
      query: territoriesQuery({
        page,
        perPage,
        fulltext: params?.search ? `name=searchphrase=${params.search}` : '',
        order: params?.sort ? { type: params.sort.sortDirection, field: params.sort.sortBy } : undefined,
        filter: parseParamsForFilter(filter),
      }),
    });
    client.valueChanges
      .pipe(untilDestroyed(this))
      .pipe(map((resp: { data: any }) => resp.data.TerritoryPaging))
      .subscribe((resp) => {
        this.model = resp.documents;
        this.pagination.rowsNumber = resp.total;
      });
  }

  public onSelectedChange(e: Array<any>) {
    this.selectedArray = clone(e);
  }

  public onActionMenuItemClickHandler(action: TerritoriesActionsEnum) {
    console.log('#ElectionPlotReadyComponent -> #onActionMenuItemClickHandler, selected item:', action);
  }

  public onCreateTerritory() {
    console.log('created territory');
  }

  public showTerritoryCreateModal(id?: string) {
    this.selectedTerritoryId = id ?? '';
    this.territoryCreateModalVisible = true;
  }

  public closeTerritoryCreateModal() {
    this.territoryCreateModalVisible = false;
  }

  public onRowClick(row: IBaseTableRow) {
    if (row.data?.id) this.showTerritoryCreateModal(row.data.id);
  }
}
