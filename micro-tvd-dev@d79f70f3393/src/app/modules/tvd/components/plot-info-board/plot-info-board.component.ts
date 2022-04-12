import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { IAppState } from '@/app/store/state/app.state';
import { EPlotStatus } from '@/app/modules/tvd/components/plot-status/plot-status.component';

@Component({
  selector: 'app-plot-info-board',
  templateUrl: './plot-info-board.component.html',
  styleUrls: ['./plot-info-board.component.scss'],
})
export class PlotInfoBoardComponent {
  /**
   * Дата создания
   */
  @Input()
  public createDate?: string | number | null;

  /**
   * Дата редактирования
   */
  @Input()
  public editDate?: string | number | null;

  /**
   * Дата редактирования
   */
  @Input()
  public std?: string | null;

  /**
   * Текущий код статуса выборов
   */
  @Input()
  public status?: EPlotStatus | null;

  /**
   * Период
   */
  @Input()
  public stage: string | null = null;

  public loading: boolean = false;

  public constructor(private _apollo: Apollo, private _store: Store<IAppState>) {}
}
