import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/modules/shared.module';
import { UserModule } from '@modules/user/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { Error404Component } from './pages/error404/error404.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { BaseDrawerComponent } from './components/base-drawer/base-drawer.component';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { DrawerItemComponent } from './components/drawer-item/drawer-item.component';
import { UtilToolbarComponent } from './components/util-toolbar/util-toolbar.component';
import { GraphqlShellModule } from './graphql-shell.module';
import { BaseHeaderComponent } from './components/base-header/base-header.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyLayoutComponent,
    MainLayoutComponent,
    DashboardComponent,
    MainComponent,
    Error404Component,
    BaseLayoutComponent,
    BaseDrawerComponent,
    PopoverMenuComponent,
    DrawerItemComponent,
    UtilToolbarComponent,
    BaseHeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    GraphqlShellModule,
    UserModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: window.env.production,
    }),
  ],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
