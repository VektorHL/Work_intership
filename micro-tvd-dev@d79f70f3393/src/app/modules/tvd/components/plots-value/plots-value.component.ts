import { Component, Input, OnInit } from '@angular/core';
import { PlotsType } from '@/app/modules/tvd/constants/plots-types.enum';
import { PlotsValue } from '@/app/modules/tvd/types/plots.interface';

@Component({
  selector: 'app-plots-value',
  templateUrl: './plots-value.component.html',
  styleUrls: ['./plots-value.component.scss'],
})
export class PlotsValueComponent implements OnInit {
  @Input()
  public model!: PlotsValue[];

  @Input()
  public type!: PlotsType;

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
