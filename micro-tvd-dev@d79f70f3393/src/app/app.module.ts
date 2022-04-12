/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule, ModalsModule } from '@cikrf/gas-components';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MfeModule } from './mfe.module';
import { BaseHeaderComponent } from './components/base-header/base-header.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { BaseLayoutComponent } from './components/layouts/base-layout/base-layout.component';
import { BaseHeaderActionsComponent } from './components/base-header-actions/base-header-actions.component';
import { TvdModule } from './modules/tvd/tvd.module';
import { GraphqlTvdModule } from './graphql-tvd.module';

@NgModule({
  declarations: [
    AppComponent,
    BaseHeaderComponent,
    MainLayoutComponent,
    BaseLayoutComponent,
    BaseHeaderActionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MfeModule,
    TvdModule,
    GraphqlTvdModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: window.env.production,
    }),
    ModalsModule,
  ],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
