import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GasBaseMenuInterface } from '@cikrf/gas-ui-kit';
import { EUserCommissionType, getUserCommissionType } from '@shared/utils/auth.utils';
import { TerritoriesActionsEnum } from '../../constants/territories-header-actions.enum';

@Component({
  selector: 'app-territories-header-actions',
  templateUrl: './territories-header-actions.component.html',
  styleUrls: ['./territories-header-actions.component.scss'],
})
export class TerritoriesHeaderActionsComponent implements OnInit {
  @Input()
  public disabled: boolean = false;

  @Output()
  public onAction = new EventEmitter<TerritoriesActionsEnum>();

  public menu: GasBaseMenuInterface[] = [
    {
      path: TerritoriesActionsEnum.CHECK_TERRITORY,
      active: false,
      disable: false,
    },
  ];

  public opened: boolean = false;

  public ngOnInit() {
    if (EUserCommissionType.CIK === getUserCommissionType()) {
      this.menu = [];
    }
  }

  public onMenuClickedHandle(action: TerritoriesActionsEnum | string) {
    switch (action) {
      case TerritoriesActionsEnum.CHECK_TERRITORY: {
        this.onAction.emit(TerritoriesActionsEnum.CHECK_TERRITORY);
        break;
      }
      default: {
        break;
      }
    }
    this.toggle();
  }

  public onClickEmptySpace() {
    this.toggle();
  }

  public toggle() {
    this.opened = false;
  }
}
