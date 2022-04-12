import { Component, OnInit, ViewChild, ViewEncapsulation, ViewRef } from '@angular/core';
import {
  cleanOutgoingLinkForRequest,
  EFormMode,
  FormGeneratorComponent,
  MetaClassSchema,
  TFormMode,
  ToastNotificationsService,
  ToastPositions,
  ToastTypes,
} from '@cikrf/gas-components';
import { select, Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EUserCommissionType, getUser, getUserCommissionType } from '@shared/utils/auth.utils';
import { IAppState } from '@/app/store/state/app.state';
import {
  editModeFormSelector,
  resetFormSelector,
  saveFormSelector,
} from '@/app/store/selectors/plots.basicInfoForm.selectors';
import {
  setEditMode,
  setFormChanged,
  setHideButtonsState,
  setResetFormState,
} from '@/app/store/actions/plots.basicInfoForm.actions';
import { PlotsService } from '@/app/services/plots.service';
import { getPlotSchemaByPlotsType, SCHEMA } from '@/app/modules/tvd/schemas/plot.schema';
import { PlotTabbedDetailsComponent } from '@/app/modules/tvd/pages/plot-tabbed-details/plot-tabbed-details.component';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';
import { EPlotStatus } from '@/app/modules/tvd/components/plot-status/plot-status.component';
import { EPlotType } from '@/app/modules/tvd/constants/plots-type.enum';

@UntilDestroy()
@Component({
  selector: 'app-plot-basic-info',
  templateUrl: './plot-basic-info.component.html',
  styleUrls: ['./plot-basic-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlotBasicInfoComponent implements OnInit {
  @ViewChild(FormGeneratorComponent)
  public formGeneratorComponent!: FormGeneratorComponent;

  public formGeneratorModel: IPlot | null = null;

  public formGeneratorMode: TFormMode = EFormMode.Preview;

  public formGeneratorSchema!: MetaClassSchema;

  public childViewRef!: ViewRef;

  public createdPlotId: string = '';

  public targetId: string = '';

  public loading$ = new BehaviorSubject(false);

  public changesModalVisible: boolean = false;

  public pageTitle: string = '';

  public constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private toastNotificationsService: ToastNotificationsService,
    private plotsService: PlotsService,
    private plotTabbedDetailsComponent: PlotTabbedDetailsComponent,
  ) {}

  public ngOnInit(): void {
    this.plotTabbedDetailsComponent?.info$.next({
      loading: true,
    });
    this.targetId = this.route.parent?.snapshot?.params?.id;
    this.fetchForm(this.targetId);
    this.initButtonsSubscriptions();
  }

  public validate(): boolean {
    return this.formGeneratorComponent?.isFormValid();
  }

  public collectChanges() {
    return { ...this.formGeneratorComponent.currentChanges() };
  }

  public fetchForm(id: string): void {
    this.formGeneratorModel = null;
    this.handleLoading(true);
    this.plotsService
      .fetchPlotById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (model: any) => {
          if (model) {
            this.initForm(model);
          } else {
            this.showNotification(ToastTypes.Error, 'Ошибка при загрузке участка', 'Попробуйте позже');
          }
          this.handleLoading(false);
        },
        (errorResponse) => {
          console.error(errorResponse);
          this.handleLoading(false);
          this.showNotification(ToastTypes.Error, 'Ошибка при загрузке участка', errorResponse.error.message);
        },
      );
  }

  public onFormChanged(formChanged: boolean) {
    this.store.dispatch(setFormChanged({ formChanged }));
  }

  public handleLoading(loading: boolean) {
    this.loading$.next(loading);
  }

  public saveForm() {
    try {
      if (this.validate()) {
        const isValid = this.formGeneratorComponent?.isFormValid();
        if (!isValid) {
          this.showNotification(ToastTypes.Critical, 'Ошибка', 'Не заполнены обязательные поля');
          return;
        }
        this.handleLoading(true);
        const model = {
          id: this.targetId,
          ...cleanOutgoingLinkForRequest(this.formGeneratorComponent.currentChanges(), SCHEMA),
        };
        this.plotsService.patchPlot(model).subscribe(
          (response: any) => {
            this.showNotification(ToastTypes.Success, 'Данные участка обновлены');
            this.createdPlotId = response?.objectIds[0];
            this.store.dispatch(setEditMode({ editMode: false }));
            this.store.dispatch(setResetFormState({ resetForm: false }));
            this.store.dispatch(setFormChanged({ formChanged: false }));
            this.formGeneratorComponent?.markFormAsClean();
            this.handleLoading(false);
            this.fetchForm(this.targetId);
          },
          (errorResponse) => {
            console.error(errorResponse);
            this.handleLoading(false);
            this.showNotification(ToastTypes.Error, 'Ошибка при обновлении данных', errorResponse.error.message);
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  private initForm(model: IPlot) {
    this.formGeneratorComponent?.markFormAsClean();
    this.formGeneratorModel = model;

    // todo на самом деле у нас там CommissionComposition т.к. нужна сортировка
    (model.parentCommissionOrg as unknown) = model.parentCommissionOrg.id;

    this.formGeneratorSchema = getPlotSchemaByPlotsType(model.plotsType);
    this.pageTitle = model?.number ? `Участок № ${model.number}` : 'Страница участка';
    window?.EventBus?.getTopic('header')?.emit('setTitle', this.pageTitle);
    this.plotTabbedDetailsComponent?.info$.next({
      std: model.std.STDID,
      createDate: '', // todo дрбавить когда появится в модели
      editDate: model.modified! * 1000,
      status: model.isActive ? EPlotStatus.ACTIVE : EPlotStatus.ARCHIVE,
      loading: false,
    });

    const user = getUser();
    const userCommission = getUserCommissionType(user);

    if (
      userCommission === EUserCommissionType.CIK ||
      (userCommission === EUserCommissionType.IKSRF && model.plotsType === EPlotType.TEMPORARY) ||
      (userCommission === EUserCommissionType.TIK && model.std.STDID !== user?.profile.std)
    ) {
      this.store.dispatch(setHideButtonsState({ hide: true }));
    }
  }

  private initButtonsSubscriptions() {
    // Подписка на нажатие кнопки "Редактировать"
    this.store.pipe(untilDestroyed(this), select<any, any>(editModeFormSelector)).subscribe((editMode) => {
      this.formGeneratorMode = editMode ? EFormMode.Edit : EFormMode.Preview;
    });

    // Подписка на нажатие кнопки "Сохранить форму"
    this.store.pipe(untilDestroyed(this), select<any, any>(saveFormSelector)).subscribe((saveClicked) => {
      if (saveClicked) {
        this.saveForm();
      }
    });

    // Подписка на нажатие кнопки "Сбросить"
    this.store.pipe(untilDestroyed(this), select<any, any>(resetFormSelector)).subscribe((resetClicked) => {
      if (resetClicked) {
        this.formGeneratorComponent?.resetModel();
        this.store.dispatch(setEditMode({ editMode: false }));
      }
    });
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
}
