import { Component, OnInit } from '@angular/core';
import {
  IBaseTableColumn,
  IBaseTableServicePagination,
  IBaseTableServiceUpdateDataParams,
  parseParamsForFilter,
  ToastNotificationsService,
  ToastPositions,
  ToastTypes,
} from '@cikrf/gas-components';
import { Router } from '@angular/router';
import { Apollo, Query } from 'apollo-angular';
import { EUserCommissionType, getUser, getUserCommissionType } from '@shared/utils/auth.utils';
import { map, take } from 'rxjs/operators';
import { forEach, pick, some, map as lodashMap, mapValues } from 'lodash';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import {
  editModeFormSelector,
  resetFormSelector,
  saveFormSelector,
} from '@store/selectors/plots.basicInfoForm.selectors';
import { setEditMode, setFormChanged, setResetFormState } from '@store/actions/plots.basicInfoForm.actions';
import { IAppState } from '@store/state/app.state';
import { BehaviorSubject } from 'rxjs';
import { GasButton } from '@cikrf/gas-ui-kit';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';
import { plotsQuery } from '@/app/modules/tvd/components/plots-list/plotsQuery';
import { columns } from './plots-list-edit.columns';
import { PlotsService } from '@/app/services/plots.service';

const checkedKeys = ['onlineTranslation', 'qrCode', 'electronicVoting', 'bulletinTreatment'] as const;

type ICheckedKeys = typeof checkedKeys[number];
interface IChecked {
  [id: string]: {
    [K in ICheckedKeys]?: boolean;
  };
}

@UntilDestroy()
@Component({
  selector: 'app-plots-list-edit',
  templateUrl: './plots-list-edit.component.html',
  styleUrls: ['./plots-list-edit.component.scss'],
})
export class PlotsListEditComponent implements OnInit {
  public colorType = GasButton.ButtonColor;

  public model!: IPlot[];

  public pagination: IBaseTableServicePagination = {
    perPage: 10,
    rowsNumber: 0,
    page: 1,
  };

  public checked: IChecked = {};

  public checkedAll: IChecked[string] = {};

  public loading$ = new BehaviorSubject(false);

  public tableColumns: IBaseTableColumn[] = columns;

  public checkedKeys = checkedKeys;

  public get filteredValue(): Array<IPlot> {
    return this.model;
  }

  public constructor(
    public router: Router,
    private apollo: Apollo,
    private store: Store<IAppState>,
    private plotsService: PlotsService,
    private toastNotificationsService: ToastNotificationsService,
  ) {}

  public ngOnInit(): void {
    this.fetchPlots();
    this.initButtons();
  }

  public fetchPlots(params?: IBaseTableServiceUpdateDataParams) {
    this.setLoading(true);
    const pagination = (params?.pagination as Required<IBaseTableServicePagination>) || {};
    const { page = 1, perPage = this.pagination.perPage || 10 } = pagination;
    const filter: Record<string, string | string[]> = {
      ...params?.filter,
    };

    const user = getUser();
    if (user) {
      const type = getUserCommissionType(user);

      if (type === EUserCommissionType.IKSRF) {
        filter['subjectRF.SUBJCOD'] = user.profile.SUBJCOD;
      } else if (type === EUserCommissionType.TIK) {
        filter['std.STDID'] = user.profile.std;
      }
    }

    const client = this.apollo.use('tvdClient').watchQuery<typeof Query>({
      query: plotsQuery({
        page,
        perPage,
        fulltext: params?.search ? `name=searchphrase=${params.search}` : '',
        order: params?.sort ? { type: params.sort.sortDirection, field: params.sort.sortBy } : undefined,
        filter: parseParamsForFilter(filter),
      }),
    });
    client.valueChanges
      .pipe(take(1))
      .pipe(map((resp: { data: any }) => resp.data.PlotPaging))
      .subscribe((resp) => {
        this.model = resp.documents;

        this.pagination = {
          rowsNumber: resp.total,
          page: resp.page,
          perPage: resp.perPage,
        };

        this.resetChecked();
        this.setLoading(false);
      });
  }

  public checkboxClickHandler(id: string, key: ICheckedKeys) {
    const params = this.checked[id];
    if (!params) return;

    params[key] = !params[key];
    this.updateCheckedAllByKey(key);
    this.setDirty(true);
  }

  public checkboxClickHandlerAll(key: ICheckedKeys) {
    const value = !this.checkedAll[key];
    forEach(this.checked, (val) => {
      val[key] = value;
    });
    this.checkedAll[key] = value;
    this.setDirty(true);
  }

  public checkPlot(id: string) {
    this.router.navigateByUrl(`/tvd/plots/${id}`);
  }

  public saveForm() {
    try {
      this.setLoading(true);

      this.plotsService
        .patchPlots(
          lodashMap(this.checked, (value, id) => ({
            ...value,
            id,
          })),
        )
        .subscribe(
          () => {
            this.showNotification(ToastTypes.Success, 'Данные участков обновлены');
            this.refresh();
          },
          (errorResponse) => {
            console.error(errorResponse);
            this.setLoading(false);
            this.showNotification(ToastTypes.Error, 'Ошибка при обновлении данных', errorResponse.error.message);
          },
        );
    } catch (error) {
      console.error(error);
    }
  }

  public deletePlot(id: string) {
    try {
      this.setLoading(true);

      this.plotsService.deletePlot(id).subscribe(
        () => {
          this.showNotification(ToastTypes.Success, 'Участок удалён');
          this.refresh();
        },
        (errorResponse) => {
          console.error(errorResponse);
          this.setLoading(false);
          this.showNotification(ToastTypes.Error, 'Ошибка при удалении участка', errorResponse.error.message);
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  private initButtons() {
    this.store.dispatch(setEditMode({ editMode: true }));

    this.store.pipe(untilDestroyed(this), select(saveFormSelector)).subscribe((saveClicked) => {
      if (saveClicked) {
        this.saveForm();
      }
    });

    this.store.pipe(untilDestroyed(this), select(resetFormSelector)).subscribe((resetClicked) => {
      if (resetClicked) {
        this.resetChecked();
      }
    });

    this.store.pipe(untilDestroyed(this), select(editModeFormSelector)).subscribe((editMode) => {
      if (!editMode) {
        this.store.dispatch(setEditMode({ editMode: true }));
      }
    });
  }

  private setLoading(loading: boolean) {
    this.loading$.next(loading);
  }

  private setDirty(formChanged: boolean) {
    this.store.dispatch(setFormChanged({ formChanged }));
  }

  private resetChecked() {
    this.setDirty(false);
    this.checked = this.model.reduce((acc, plot) => {
      acc[plot.id] = mapValues(pick(plot, checkedKeys), (v) => !!v);
      return acc;
    }, {} as IChecked);
    this.checkedAll = {};

    checkedKeys.forEach(this.updateCheckedAllByKey, this);
  }

  private updateCheckedAllByKey(key: ICheckedKeys) {
    const [first, ...rest] = Object.values(this.checked);
    this.checkedAll[key] = first?.[key];
    if (some(rest, (checked) => checked[key] !== this.checkedAll[key])) {
      this.checkedAll[key] = undefined;
    }
  }

  private showNotification(type: ToastTypes, title: string, description?: string) {
    this.toastNotificationsService.push({
      position: ToastPositions.BottomRight,
      duration: 5000,
      type,
      title,
      description,
    });
  }

  private refresh() {
    this.store.dispatch(setResetFormState({ resetForm: false }));
    this.store.dispatch(setFormChanged({ formChanged: false }));
    this.fetchPlots();
  }
}
