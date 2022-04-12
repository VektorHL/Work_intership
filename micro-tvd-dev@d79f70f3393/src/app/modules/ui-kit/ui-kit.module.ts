import { NgModule } from '@angular/core';
import { GasUiKitModule } from '@cikrf/gas-components';
import { GasSectionSelectModule } from '@cikrf/gas-ui-kit';

@NgModule({
  imports: [GasUiKitModule, GasSectionSelectModule],
  exports: [GasUiKitModule, GasSectionSelectModule],
})
export class UiKitModule {}
