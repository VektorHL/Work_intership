import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasUiKitModule, SharedModule as _SharedModule } from '@cikrf/gas-components';

@NgModule({
  declarations: [],
  imports: [CommonModule, GasUiKitModule, _SharedModule],
  exports: [CommonModule, GasUiKitModule, _SharedModule],
})
export class SharedModule {}
