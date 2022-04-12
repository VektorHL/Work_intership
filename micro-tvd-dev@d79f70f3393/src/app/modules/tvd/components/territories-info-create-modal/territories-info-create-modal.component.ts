import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  convertObjSchemaResponse,
  EFormMode,
  FormGeneratorComponent,
  MetaClassSchema,
  TFormMode,
} from '@cikrf/gas-components';
import { Schema } from './schema';

@Component({
  selector: 'app-territories-info-create-modal',
  templateUrl: './territories-info-create-modal.component.html',
  styleUrls: ['./territories-info-create-modal.component.scss'],
})
export class TerritoriesInfoCreateModalComponent implements OnInit {
  @Input()
  public formGeneratorMode: TFormMode = EFormMode.Create;

  @Input()
  public subjectRF?: any = '';

  @ViewChild(FormGeneratorComponent)
  public formGeneratorComponent!: FormGeneratorComponent;

  public formGeneratorModel: any = {};

  public formGeneratorSchema: MetaClassSchema | null = null;

  public ngOnInit() {
    if (this.subjectRF) {
      this.formGeneratorModel = this.mapResponseModel({ subjectRF: this.subjectRF });
    }
    this.formGeneratorSchema = convertObjSchemaResponse(Schema);
  }

  private mapResponseModel(model: any): object {
    const flatModel: any = { ...model };
    Object.keys(flatModel).forEach((attrName) => {
      const value = flatModel[attrName];
      const { props } = Schema.attrList.find((attr) => attrName === attr.name && !!attr?.props?.idField) ?? {};
      if (props && props.idField && !!value[props.idField]) {
        flatModel[attrName] = value[props.idField];
      }
    });
    return flatModel;
  }
}
