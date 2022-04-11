import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/modules/shared.module';
import { UserInfoModalComponent } from '@modules/user/modals/user-info-modal/user-info-modal.component';

@NgModule({
  declarations: [UserInfoModalComponent],
  imports: [SharedModule],
  exports: [UserInfoModalComponent],
})
export class UserModule {}
