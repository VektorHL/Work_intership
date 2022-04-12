import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  cleanOutgoingLinkForRequest,
  EFormMode,
  FormGeneratorComponent,
  FormGeneratorEventHandler,
  MetaClassSchema,
  TFormMode,
  ToastNotificationsService,
  ToastPositions,
  ToastTypes,
} from '@cikrf/gas-components';
import { stubTrue, debounce, pickBy, negate, isNil } from 'lodash';
import { PlotsService } from '@/app/services/plots.service';
import { IAppState } from '@/app/store/state/app.state';
import { saveFormSelector } from '@/app/store/selectors/plots.basicInfoForm.selectors';
import { getPlotSchemaByPlotsType, SCHEMA } from '../../schemas/plot.schema';
import { setEditMode, setFormChanged, setResetFormState } from '@/app/store/actions/plots.basicInfoForm.actions';
import { IPlot } from '@/app/modules/tvd/types/plots.interface';
import { EPlotType } from '@/app/modules/tvd/constants/plots-type.enum';

@UntilDestroy()
@Component({
  selector: 'app-plot-create',
  templateUrl: './plot-create.component.html',
  styleUrls: ['./plot-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlotCreateComponent implements OnInit {
  @ViewChild(FormGeneratorComponent)
  public formGeneratorComponent!: FormGeneratorComponent;

  public formGeneratorMode: TFormMode = EFormMode.Create;

  public formGenetatorModel: Partial<IPlot> = {};

  public formGeneratorSchema!: MetaClassSchema;

  public loading$ = new BehaviorSubject(false);

  public createdPlotId: string = '';

  public formGeneratorEvents: Array<FormGeneratorEventHandler> = [
    {
      targetFields: ['name', 'number'],
      condition: stubTrue,
      action: (_, targetField, newVal, model) => {
        const { name, number } = model;
        const { name: type } = targetField;

        const fromName = 'name' in model ? /^\s*Участок №\s*((?:[1-9]\d*)?)\s*$/.exec(name)?.[1] : '';
        const fromNumber = /^\s*([1-9]\d*)\s*$/.exec(number)?.[1] ?? '';

        if (fromName === undefined || fromName === fromNumber) return;

        this.formGeneratorPatchModel(type === 'name' ? { number: +fromName } : { name: `Участок №${fromNumber}` });
      },
      counterAction: () => {},
    },
  ];

  private formGeneratorPatchModel = debounce((model: Partial<IPlot>) => {
    this.formGeneratorComponent.form.patchValue(model);
  }, 100);

  public constructor(
    private toastNotificationsService: ToastNotificationsService,
    private store: Store<IAppState>,
    private router: Router,
    private plotsService: PlotsService,
    private ref: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.initButtonsSubscriptions();
    this.initForm();
    window?.EventBus?.getTopic('header')?.emit('setTitle', 'Новый участок');
  }

  public saveForm() {
    try {
      const changes = this.getCurrentModel();

      const isValid = this.formGeneratorComponent?.isFormValid();
      if (!isValid) {
        this.showNotification(ToastTypes.Critical, 'Ошибка', 'Не заполнены обязательные поля');
        return;
      }
      this.handleLoading(true);
      this.plotsService.createPlot(cleanOutgoingLinkForRequest(changes, SCHEMA)).subscribe(
        (response: any) => {
          this.showNotification(ToastTypes.Success, 'Участок успешно создан');
          this.createdPlotId = response?.objectIds[0];
          this.store.dispatch(setEditMode({ editMode: false }));
          this.store.dispatch(setResetFormState({ resetForm: false }));
          this.store.dispatch(setFormChanged({ formChanged: false }));
          this.handleLoading(false);
          this.router.navigateByUrl(`/tvd/plots/${this.createdPlotId}`);
        },
        (errorResponse) => {
          console.error(errorResponse);
          this.handleLoading(false);
          this.showNotification(ToastTypes.Error, 'Ошибка при создании нового участка', errorResponse.error.message);
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  public onFormChanged(formChanged: boolean) {
    this.store.dispatch(setFormChanged({ formChanged }));
  }

  public handleLoading(loading: boolean) {
    this.loading$.next(loading);
  }

  private initButtonsSubscriptions() {
    // Подписка на клиек сохранения формы
    this.store.pipe(untilDestroyed(this), select<any, any>(saveFormSelector)).subscribe((saveClicked) => {
      this.ref.detectChanges();
      if (saveClicked) {
        this.saveForm();
      }
    });
  }

  private initForm() {
    this.formGenetatorModel = {
      name: 'Участок №',
      plotsType: EPlotType.TEMPORARY,
    };
    const schema = getPlotSchemaByPlotsType(this.formGenetatorModel.plotsType!);
    schema.grid = {
      ...schema.grid,
      initialVoterCount: {
        col: 6,
      },
      regVoterCount: {
        col: 6,
      },
    };

    this.formGeneratorSchema = schema;
  }

  private getCurrentModel(): object {
    // todo научить ФГ отдавать значения disabled и hidden полей
    const modelDiff = pickBy(
      this.formGeneratorComponent.getModelDiff(this.formGeneratorComponent.form.getRawValue(), this.formGenetatorModel),
      negate(isNil),
    );
    return {
      ...this.formGenetatorModel,
      ...this.formGeneratorComponent.convertRequestParams(modelDiff),
    };
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
