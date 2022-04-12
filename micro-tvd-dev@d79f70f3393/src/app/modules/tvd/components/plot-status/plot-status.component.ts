import { Component, Input } from '@angular/core';

export const enum EPlotStatus {
  ACTIVE = 1,
  ARCHIVE = 2,
}

export const plotStatusMap = {
  [EPlotStatus.ACTIVE]: 'Действующий',
  [EPlotStatus.ARCHIVE]: 'Архивный',
} as const;

@Component({
  selector: 'app-plot-status',
  templateUrl: './plot-status.component.html',
  styleUrls: ['./plot-status.component.scss'],
})
export class PlotStatusComponent {
  @Input()
  public status!: EPlotStatus;

  public label = '';

  public plotStatusMap = plotStatusMap;
}
