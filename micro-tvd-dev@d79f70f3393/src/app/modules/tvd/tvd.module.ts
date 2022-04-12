/* eslint max-len:"off" */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseTableModule, FormGeneratorModule, SharedModule } from '@cikrf/gas-components';
import { DynamicModule } from 'ng-dynamic-component';
import { TVDSharedModule } from '@/app/shared/shared.module';
import { GraphqlTvdModule } from '../../graphql-tvd.module';
import { TvdMainComponent } from '@/app/modules/tvd/components/tvd-main/tvd-main.component';
import { TvdListMainComponent } from '@/app/modules/tvd/components/tvd-list/tvd-list-main.component';
import { PlotsListComponent } from '@/app/modules/tvd/components/plots-list/plots-list.component';
import { TerritoriesListComponent } from '@/app/modules/tvd/components/territories-list/territories-list.component';
import { TerritoriesValueComponent } from './components/territories-value/territories-value.component';
import { TerritoriesHeaderActionsComponent } from './components/territories-header-actions/territories-header-actions.component';
import { TerritoriesCreateModalComponent } from './components/territories-create-modal/territories-create-modal.component';
import { TerritoriesInfoCreateModalComponent } from './components/territories-info-create-modal/territories-info-create-modal.component';
import { TerritoriesListRowActionsComponent } from './components/territories-list-row-actions/territories-list-row-actions.component';
import { PlotsHeaderActionsComponent } from './components/plots-header-actions/plots-header-actions.component';
import { PlotsListRowActionsComponent } from './components/plots-list-row-actions/plots-list-row-actions.component';
import { PlotsValueComponent } from './components/plots-value/plots-value.component';
import { PlotCreateComponent } from './pages/plot-create/plot-create.component';
import { PlotBatchFormationComponent } from './pages/plots-batch-formation/plots-batch-formation.component';
import { PlotTabbedDetailsComponent } from './pages/plot-tabbed-details/plot-tabbed-details.component';
import { PlotBasicInfoComponent } from './components/plot-basic-info-form/plot-basic-info.component';
import { PlotBaseComponent } from '@/app/modules/tvd/components/plot-base/plot-base.component';
import { PlotBoundariesComponent } from '@/app/modules/tvd/components/plot-boundaries-table/plot-boundaries.component';
import { PlotParticipationComponent } from '@/app/modules/tvd/components/plot-participation-table/plot-participation.component';
import { PlotInfoBoardComponent } from '@/app/modules/tvd/components/plot-info-board/plot-info-board.component';
import { PlotsToolbarButtonComponent } from '@/app/modules/tvd/components/plots-toolbar-button/plots-toolbar-button.component';
import { PlotStatusComponent } from './components/plot-status/plot-status.component';
import { PlotsListEditComponent } from './components/plots-list-edit/plots-list-edit.component';
import { PlotsAllowedStdEditComponent } from './components/plots-allowed-std-edit/plots-allowed-std-edit.component';

@NgModule({
  declarations: [
    PlotsToolbarButtonComponent,
    TvdMainComponent,
    TvdListMainComponent,
    PlotsListComponent,
    TerritoriesListComponent,
    TerritoriesValueComponent,
    TerritoriesHeaderActionsComponent,
    TerritoriesCreateModalComponent,
    TerritoriesInfoCreateModalComponent,
    TerritoriesListRowActionsComponent,
    PlotsHeaderActionsComponent,
    PlotsListRowActionsComponent,
    PlotsValueComponent,
    PlotBaseComponent,
    PlotCreateComponent,
    PlotBatchFormationComponent,
    PlotTabbedDetailsComponent,
    PlotParticipationComponent,
    PlotBoundariesComponent,
    PlotBasicInfoComponent,
    PlotInfoBoardComponent,
    PlotStatusComponent,
    PlotsListEditComponent,
    PlotsAllowedStdEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormGeneratorModule,
    GraphqlTvdModule,
    RouterModule,
    TVDSharedModule,
    BaseTableModule,
    SharedModule,
    FormGeneratorModule,
    DynamicModule,
  ],
  exports: [TvdMainComponent, PlotsToolbarButtonComponent],
})
export class TvdModule {}
