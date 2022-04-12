import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  convertObjSchemaResponse,
  EFormMode,
  FormGeneratorComponent,
  MetaClassSchema,
  TFormMode,
  ToastNotificationsService,
  ToastPositions,
  ToastTypes,
} from '@cikrf/gas-components';
import { Schema } from './create-schema';
import { TerritoryService } from '@/app/services/territory.service';

@Component({
  selector: 'app-territories-create-modal',
  templateUrl: './territories-create-modal.component.html',
  styleUrls: ['./territories-create-modal.component.scss'],
})
export class TerritoriesCreateModalComponent implements OnInit {
  @Input()
  public visible: boolean = false;

  @Input()
  public territoryId: string = '';

  @Input()
  public persistent: boolean = true;

  @Output()
  public visibleChange = new EventEmitter<boolean>();

  @Output()
  public submittedEvent = new EventEmitter<string>();

  @ViewChild(FormGeneratorComponent)
  public formGeneratorComponent!: FormGeneratorComponent;

  public formGeneratorMode: TFormMode = !this.territoryId ? EFormMode.Create : EFormMode.Edit;

  public formGeneratorModel: any = null;

  public formGeneratorSchema: MetaClassSchema | null = null;

  public form!: FormGroup;

  public get createMode() {
    return !this.territoryId;
  }

  public constructor(
    private territoryService: TerritoryService,
    private notificationsService: ToastNotificationsService,
  ) {}

  public ngOnInit(): void {
    if (this.territoryId) {
      this.territoryService.fetchTerritoryById(this.territoryId).subscribe(
        (data: any) => {
          this.formGeneratorModel = { ...data, std: data?.std?.STDID };
          this.formGeneratorSchema = convertObjSchemaResponse(Schema);
        },
        (errorResponse) => {
          console.error(errorResponse);
          this.showNotification(ToastTypes.Error, 'Ошибка при загрузке участка', errorResponse.error.message);
        },
      );
    } else {
      this.formGeneratorModel = {};
      this.formGeneratorSchema = convertObjSchemaResponse(Schema);
    }
  }

  public onHideModal() {
    this.territoryId = '';
    this.visibleChange.emit(false);
  }

  public submit(): void {
    try {
      const changes = this.formGeneratorComponent.currentChanges();
      const isValid = this.formGeneratorComponent?.isFormValid();
      if (!isValid) {
        this.showNotification(ToastTypes.Critical, 'Ошибка', 'Не заполнены обязательные поля');
        return;
      }
      this.territoryService.createTerritory(this.mapRequestModel(changes)).subscribe(
        (response: any) => {
          this.showNotification(ToastTypes.Success, 'Создание новой территории', 'Территория успешно создана');
          if (response?.objectIds[0]) {
            this.onHideModal();
            this.submittedEvent.emit();
          }
          // this.createdDistrictId = response?.objectIds[0];
        },
        (errorResponse) => {
          console.error(errorResponse);
          this.showNotification(ToastTypes.Error, 'Ошибка при создании новой территории', errorResponse.error.message);
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  public collectChanges(): { [key: string]: any } {
    return { ...this.formGeneratorComponent.currentChanges() };
  }

  private mapRequestModel(model: object): object {
    const patchedModel: any = { ...model, std: { STDID: this.collectChanges()?.std } };
    return patchedModel;
  }

  private showNotification(type: ToastTypes, title: string, description: string) {
    this.notificationsService.push({
      position: ToastPositions.BottomRight,
      duration: 5000,
      type,
      title,
      description,
    });
  }
}
