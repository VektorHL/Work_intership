/* eslint-disable max-len */
/**
 * Важно: не удалять данный файл!
 * Служит для роутинга при подключении микрофронта к ядру.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvdListMainComponent } from '@/app/modules/tvd/components/tvd-list/tvd-list-main.component';
import { PlotsListComponent } from '@/app/modules/tvd/components/plots-list/plots-list.component';
import { TerritoriesListComponent } from '@/app/modules/tvd/components/territories-list/territories-list.component';
import { PlotCreateComponent } from '@/app/modules/tvd/pages/plot-create/plot-create.component';
import { PlotBatchFormationComponent } from '@/app/modules/tvd/pages/plots-batch-formation/plots-batch-formation.component';
import { PlotTabbedDetailsComponent } from '@/app/modules/tvd/pages/plot-tabbed-details/plot-tabbed-details.component';
import { PlotBaseComponent } from '@/app/modules/tvd/components/plot-base/plot-base.component';
import { PlotBasicInfoComponent } from '@/app/modules/tvd/components/plot-basic-info-form/plot-basic-info.component';
import { PlotBoundariesComponent } from '@/app/modules/tvd/components/plot-boundaries-table/plot-boundaries.component';
import { PlotParticipationComponent } from '@/app/modules/tvd/components/plot-participation-table/plot-participation.component';
import { PlotsListEditComponent } from '@/app/modules/tvd/components/plots-list-edit/plots-list-edit.component';
import { PlotsAllowedStdEditComponent } from '@/app/modules/tvd/components/plots-allowed-std-edit/plots-allowed-std-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tvd/plots',
    pathMatch: 'full',
  },
  {
    path: 'tvd',
    component: TvdListMainComponent,
    data: {
      name: 'tvd',
      label: 'Территории и участки',
    },
    children: [
      {
        path: 'plots',
        component: PlotsListComponent,
        data: {
          name: 'plots',
          label: 'Участки',
        },
      },
      {
        path: 'tvd-territories',
        component: TerritoriesListComponent,
        data: {
          name: 'tvd-territories',
          label: 'Территории',
        },
      },
    ],
  },
  {
    path: 'tvd/plots',
    component: PlotBaseComponent,
    children: [
      {
        path: 'create',
        component: PlotCreateComponent,
        data: {
          name: 'create',
          label: 'Новый участок',
        },
      },
      {
        path: 'formation',
        component: PlotBatchFormationComponent,
        data: {
          name: 'formation',
          label: 'Пакетное формирование',
        },
      },
      {
        path: 'list-edit',
        component: PlotsListEditComponent,
        data: {
          name: 'list-edit',
          label: 'Редактировать техническое оснащение',
        },
      },
      {
        path: 'allowed-std-edit',
        component: PlotsAllowedStdEditComponent,
        data: {
          name: 'allowed-std-edit',
          label: 'Использование участков другого СТД',
        },
      },
      {
        path: ':id',
        component: PlotTabbedDetailsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'basic',
          },
          {
            path: 'basic',
            component: PlotBasicInfoComponent,
            data: {
              name: 'basic',
              label: 'Основные сведения',
            },
          },
          {
            path: 'boundaries',
            component: PlotBoundariesComponent,
            data: {
              name: 'boundaries',
              label: 'Границы участка',
            },
          },
          {
            path: 'participation',
            component: PlotParticipationComponent,
            data: {
              name: 'participation',
              label: 'Участие в выборах',
            },
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfeRoutingModule {}
