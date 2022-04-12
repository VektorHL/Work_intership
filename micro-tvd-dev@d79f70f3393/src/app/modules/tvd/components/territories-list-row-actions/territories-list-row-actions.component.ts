import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseGasMenu, IBaseTableRowActionsProps } from '@cikrf/gas-components';
import { GasBaseMenuInterface, GasCard } from '@cikrf/gas-ui-kit';
import { TerritoriesRowActionsEnum } from '../../constants/territories-row-actions-types.enum';

@Component({
  selector: 'app-territories-list-row-actions',
  templateUrl: './territories-list-row-actions.component.html',
  styleUrls: ['./territories-list-row-actions.component.scss'],
})
export class TerritoriesListRowActionsComponent implements OnInit {
  @Input()
  public rowProps!: IBaseTableRowActionsProps;

  @Output()
  public checkTerritory = new EventEmitter();

  public menu: GasBaseMenuInterface[] = [];

  public get spacingTypeEnum(): typeof GasCard.SpacingType {
    return GasCard.SpacingType;
  }

  public ngOnInit() {
    this.menu = [new BaseGasMenu<TerritoriesRowActionsEnum>({ path: TerritoriesRowActionsEnum.CHECK_TERRITORY })];
  }

  public onMenuClickedHandle(event: any) {
    const action: TerritoriesRowActionsEnum = event.path;
    switch (action) {
      case TerritoriesRowActionsEnum.CHECK_TERRITORY: {
        this.checkTerritory.emit(this.rowProps.row.data.id);
        break;
      }
      default: {
        console.log({
          action,
        });
      }
    }
  }
}
