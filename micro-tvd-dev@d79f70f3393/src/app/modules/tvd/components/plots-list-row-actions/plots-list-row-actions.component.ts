import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseGasMenu, IBaseTableRowActionsProps } from '@cikrf/gas-components';
import { GasBaseMenuInterface, GasCard } from '@cikrf/gas-ui-kit';
import { PlotsRowActionsEnum } from '@/app/modules/tvd/constants/plots-row-actions-types.enum';

@Component({
  selector: 'app-plots-list-row-actions',
  templateUrl: './plots-list-row-actions.component.html',
  styleUrls: ['./plots-list-row-actions.component.scss'],
})
export class PlotsListRowActionsComponent implements OnInit {
  @Input()
  public rowProps!: IBaseTableRowActionsProps;

  @Output()
  public checkPlot = new EventEmitter();

  @Output()
  public editPlot = new EventEmitter();

  public menu: GasBaseMenuInterface[] = [];

  public get spacingTypeEnum(): typeof GasCard.SpacingType {
    return GasCard.SpacingType;
  }

  public ngOnInit() {
    this.menu = [new BaseGasMenu<PlotsRowActionsEnum>({ path: PlotsRowActionsEnum.CHECK_PLOT })];
  }

  public onMenuClickedHandle(event: any) {
    const action: PlotsRowActionsEnum = event.path;
    switch (action) {
      case PlotsRowActionsEnum.CHECK_PLOT: {
        this.checkPlot.emit(this.rowProps.row.data.id);
        break;
      }
      default: {
        break;
      }
    }
  }
}
