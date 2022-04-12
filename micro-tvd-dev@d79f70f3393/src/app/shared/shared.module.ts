import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@cikrf/gas-components';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [CommonModule, SharedModule],
  exports: [PageHeaderComponent, SharedModule],
})
export class TVDSharedModule {}
