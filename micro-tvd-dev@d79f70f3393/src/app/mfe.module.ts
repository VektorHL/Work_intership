/**
 * Важно, содержит модули и компоненты, используемые в ядре.
 * Должен находиться на одном уровне с app.module, иначе будет ошибка при просмотре из ядра
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessTokenInterceptor, FormEditingService, UnauthorizedResponseInterceptor } from '@cikrf/gas-components';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from '@/app/store/reducers/app.reducer';
import { MfeRoutingModule } from './mfe-routing.module';
import { TvdModule } from './modules/tvd/tvd.module';

@NgModule({
  imports: [
    MfeRoutingModule,
    CommonModule,
    TvdModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: (window as any).env.production,
    }),
    StoreModule.forFeature('plots', appReducer),
    StoreModule.forFeature('tvd', appReducer),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedResponseInterceptor,
      multi: true,
    },
    FormEditingService,
  ],
  exports: [CommonModule],
})
export class MfeModule {}
