import { Component, OnInit } from '@angular/core';
import { GasBaseMenuInterface, GasPositioning } from '@cikrf/gas-ui-kit';
import { BasePopoverMenuComponent } from '@cikrf/gas-components';
import { Router } from '@angular/router';
import { EUserCommissionType, getUserCommissionType } from '@shared/utils/auth.utils';

export enum EHandbookAddOptions {
  NEW_PLOT = 'Новый участок',
  BATCH_FORMATION = 'Пакетное формирование',
  LIST_EDIT = 'Редактировать техническое оснащение',
}

export enum EHandbookActionOptions {
  ALLOWED_STD_EDIT = 'Использование участков другого СТД',
}

@Component({
  selector: 'app-plots-header-actions',
  templateUrl: './plots-header-actions.component.html',
  styleUrls: ['./plots-header-actions.component.scss'],
})
export class PlotsHeaderActionsComponent implements OnInit {
  public popoverPosition = [GasPositioning.Direction.Bottom];

  public popoverMenuComponent = BasePopoverMenuComponent;

  public addButtonOptions: GasBaseMenuInterface[] = [];

  public actionButtonOptions: GasBaseMenuInterface[] = [];

  public constructor(private _router: Router) {}

  public ngOnInit() {
    switch (getUserCommissionType()) {
      case EUserCommissionType.CIK:
        this.addButtonOptions = [];
        this.actionButtonOptions = [];
        break;
      case EUserCommissionType.IKSRF:
        this.addButtonOptions = [
          {
            path: EHandbookAddOptions.BATCH_FORMATION,
            active: false,
            disable: false,
          },
        ];

        this.actionButtonOptions = [
          {
            path: EHandbookActionOptions.ALLOWED_STD_EDIT,
            active: false,
            disable: false,
          },
        ];
        break;
      default:
        this.addButtonOptions = [
          {
            path: EHandbookAddOptions.NEW_PLOT,
            active: false,
            disable: false,
          },
          {
            path: EHandbookAddOptions.BATCH_FORMATION,
            active: false,
            disable: false,
          },
          {
            path: EHandbookAddOptions.LIST_EDIT,
            active: false,
            disable: false,
          },
        ];
        break;
    }
  }

  public onAddOptionItemClicked(item: GasBaseMenuInterface) {
    const action: EHandbookAddOptions = item.path as EHandbookAddOptions;
    switch (action) {
      case EHandbookAddOptions.NEW_PLOT: {
        this._router.navigateByUrl('/tvd/plots/create');
        break;
      }
      case EHandbookAddOptions.BATCH_FORMATION: {
        this._router.navigateByUrl('/tvd/plots/formation');
        break;
      }
      case EHandbookAddOptions.LIST_EDIT: {
        this._router.navigateByUrl('/tvd/plots/list-edit');
        break;
      }
      default:
        break;
    }
  }

  public onActionOptionItemClicked(item: GasBaseMenuInterface) {
    const action: EHandbookActionOptions = item.path as EHandbookActionOptions;
    switch (action) {
      case EHandbookActionOptions.ALLOWED_STD_EDIT: {
        this._router.navigateByUrl('/tvd/plots/allowed-std-edit');
        break;
      }
      default:
        break;
    }
  }
}
