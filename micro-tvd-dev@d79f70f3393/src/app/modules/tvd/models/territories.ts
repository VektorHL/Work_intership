import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITerritory, TerritoriesStd, TerritoriesSubjRF } from '@/app/modules/tvd/types/territories.interface';

export class Territory implements ITerritory {
  public id: string;

  public name: string;

  public number: number;

  public subjectRF: TerritoriesSubjRF;

  public std: TerritoriesStd;

  public constructor(payload: Territory) {
    this.id = payload.id;
    this.name = payload.name;
    this.number = payload.number;
    this.subjectRF = payload.subjectRF;
    this.std = payload.std;
  }

  public toFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      number: new FormControl(this.number, [Validators.required]),
    });
  }

  public static fromFormGroup(formGroup: FormGroup) {
    const formGroupValue = formGroup.value as Territory;
    const territory = new Territory({ name: {} } as Territory);
    territory.name = formGroupValue.name;
    territory.number = formGroupValue.number;
    return territory;
  }
}
