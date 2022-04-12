import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TerritoriesValue } from '@/app/modules/tvd/types/territories.interface';
import { ETerritoryType } from '@/app/modules/tvd/constants/territories-types.enum';

@UntilDestroy()
@Component({
  selector: 'app-territories-value',
  templateUrl: './territories-value.component.html',
  styleUrls: ['./territories-value.component.scss'],
})
export class TerritoriesValueComponent implements OnInit {
  @Input()
  public model!: TerritoriesValue[];

  @Input()
  public type!: ETerritoryType;

  public value = '';

  public ngOnInit() {
    this.value = this.model
      .map((el) => {
        const value = el[this.type];
        if (value === true) return 'да';
        if (value === false) return 'нет';
        return value;
      })
      .join(', ');
  }
}
