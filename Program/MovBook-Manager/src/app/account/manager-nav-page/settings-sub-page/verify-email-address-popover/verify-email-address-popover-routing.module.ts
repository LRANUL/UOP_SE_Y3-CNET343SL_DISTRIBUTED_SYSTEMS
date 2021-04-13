import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyEmailAddressPopoverPage } from './verify-email-address-popover.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailAddressPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyEmailAddressPopoverPageRoutingModule {}
