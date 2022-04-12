import { BehaviorSubject } from 'rxjs';
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
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { debounce, stubTrue } from 'lodash';
import { select, Store } from '@ngrx/store';
import { finalize, first } from 'rxjs/operators';
import { EUserCommissionType, getUserCommissionType } from '@shared/utils/auth.utils';
import { getPlotBatchSchemaByUserCommissionType, IPlotParams } from './batch-formation.mock';
import { PlotsService } from '@/app/services/plots.service';
import { IAppState } from '@/app/store/state/app.state';
import { saveFormSelector } from '@/app/store/selectors/plots.basicInfoForm.selectors';
import { setFormChanged } from '@/app/store/actions/plots.basicInfoForm.actions';
import { EPlotType } from '@/app/modules/tvd/constants/plots-type.enum';

@UntilDestroy()
@Component({
  selector: 'app-plots-batch-formation',
  templateUrl: './plots-batch-formation.component.html',
  styleUrls: ['./plots-batch-formation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlotBatchFormationComponent implements OnInit {
  @ViewChild(FormGeneratorComponent)
  public formGeneratorComponent!: FormGeneratorComponent;

  public formGeneratorMode: TFormMode = EFormMode.Create;

  public formGenetatorModel: any = {};

  public formGeneratorSchema!: MetaClassSchema;

  public loading$ = new BehaviorSubject(false);

  public formGeneratorEvents: Array<FormGeneratorEventHandler> = [
    {
      targetFields: ['start', 'end', 'number'],
      condition: stubTrue,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: (context: any, targetField, newVal, model) => {
        const [start, end, number] = ['start', 'end', 'number'].map((key) => Number(model[key]));
        const { name: type } = targetField;

        if (start) {
          if (type === 'number' || (type === 'start' && number && !end)) {
            if (number) {
              this.formGeneratorPatchModel({ end: `${number + start - 1}` });
            }
          } else if (start <= end) {
            this.formGeneratorPatchModel({ number: `${end - start + 1}` });
          } else if (number) {
            this.formGeneratorPatchModel({ number: '' });
          }
        }
      },
      counterAction: () => {},
    },
  ];

  private formGeneratorPatchModel = debounce((model: Partial<IPlotParams>) => {
    this.formGeneratorComponent.form.patchValue(model);
  }, 100);

  public constructor(
    private plotsService: PlotsService,
    private store: Store<IAppState>,
    private ref: ChangeDetectorRef,
    private toastNotificationsService: ToastNotificationsService,
  ) {}

  public ngOnInit() {
    this.initButtonsSubscriptions();
    this.initForm();
    window?.EventBus?.getTopic('header')?.emit('setTitle', 'Пакетное формирование');
  }

  public onFormChanged(formChanged: boolean) {
    this.store.dispatch(setFormChanged({ formChanged }));
  }

  public saveForm() {
    const { start, end, ...data } = cleanOutgoingLinkForRequest(
      {
        ...this.formGenetatorModel,
        ...this.formGeneratorComponent.currentChanges(),
      },
      this.formGeneratorSchema,
    ) as IPlotParams;

    const isValid = this.formGeneratorComponent?.isFormValid();
    if (!isValid) {
      this.showNotification(ToastTypes.Critical, 'Ошибка', 'Не заполнены обязательные поля');
      return;
    }

    this.loading$.next(true);

    this.plotsService
      .savePlotsBatchFormation(start, end, data)
      .pipe(
        first(),
        finalize(() => {
          this.loading$.next(false);
        }),
      )
      .subscribe(
        (response: any) => {
          if (response) {
            this.showNotification(ToastTypes.Success, 'Успех', 'Данные участка обновлены');
          }
        },
        (errorResponse) => {
          console.error(errorResponse);
          console.log(errorResponse);
        },
      );
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

  private showNotification(type: ToastTypes, title: string, description: string) {
    this.toastNotificationsService.push({
      position: ToastPositions.BottomRight,
      duration: 5000,
      type,
      title,
      description,
    });
  }

  private initForm() {
    const type = getUserCommissionType();
    this.formGenetatorModel = {
      plotsType: type === EUserCommissionType.IKSRF ? EPlotType.PERMANENT : EPlotType.TEMPORARY,
    };
    this.formGeneratorSchema = getPlotBatchSchemaByUserCommissionType(type);
  }
}
