import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createMicroFrontendRoutes } from 'ng-module-federation';
import { microFrontends } from '../micro-frontends';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { Error404Component } from './pages/error404/error404.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PlansComponent } from './components/plans/plans.component';
import { PreloaderComponent } from './components/preloader/preloader.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/paip/authorities',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          name: 'dashboard',
        },
      },
    ],
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent,
        data: {
          name: 'main',
        },
      },
      {
        path: 'tasks',
        component: TasksComponent,
        data: {
          name: 'tasks',
        },
      },
      {
        path: 'plans',
        component: PlansComponent,
        data: {
          name: 'plans',
        },
      },
    ],
  },
  {
    path: 'error',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        component: Error404Component,
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [...createMicroFrontendRoutes(microFrontends)],
  },
  {
    path: 'callback',
    component: PreloaderComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
