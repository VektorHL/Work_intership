/**
    * Тут мне надо подключить компонент моего дашборда, что я и сделал
    * Кроме дашборда тут:
    *     error - видел и не раз
    *     main - хз что это и зачем нужно, никогда не видел
    */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createMicroFrontendRoutes } from 'ng-module-federation';
import { microFrontends } from '../micro-frontends';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // дефолтный (старый) дашборд
import { MainComponent } from './pages/main/main.component';
import { Error404Component } from './pages/error404/error404.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PlansComponent } from './components/plans/plans.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { MyTestDashboardComponent } from './pages/my-test-dashboard/my-test-dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: window.env.APP_DEFAULT_ROUTE,
    pathMatch: 'full',
  },
  {
    path: 'not-really-my-dashboard',   // имя URL-ссылки для navigator-menu-config
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: MyTestDashboardComponent, // было   component: DashboardComponent,
        data: {
          name: 'my-dashboard',  //это имя в navigator-menu-config; поле name
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



// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: window.env.APP_DEFAULT_ROUTE,
//     pathMatch: 'full',
//   },
//   {
//     path: 'dashboard',
//     component: MainLayoutComponent,
//     children: [
//       {
//         path: '',
//         component: DashboardComponent,
//         data: {
//           name: 'dashboard',
//         },
//       },
//     ],
//   },
//   {
//     path: 'main',
//     component: MainLayoutComponent,
//     children: [
//       {
//         path: '',
//         component: MainComponent,
//         data: {
//           name: 'main',
//         },
//       },
//       {
//         path: 'tasks',
//         component: TasksComponent,
//         data: {
//           name: 'tasks',
//         },
//       },
//       {
//         path: 'plans',
//         component: PlansComponent,
//         data: {
//           name: 'plans',
//         },
//       },
//     ],
//   },
//   {
//     path: 'error',
//     component: EmptyLayoutComponent,
//     children: [
//       {
//         path: '',
//         component: Error404Component,
//       },
//     ],
//   },
//   {
//     path: '',
//     component: MainLayoutComponent,
//     children: [...createMicroFrontendRoutes(microFrontends)],
//   },
//   {
//     path: 'callback',
//     component: PreloaderComponent,
//   },
//   {
//     path: '**',
//     redirectTo: 'error',
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
