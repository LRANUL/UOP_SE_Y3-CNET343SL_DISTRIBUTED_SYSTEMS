import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerRegistrationModalPage } from './customer-registration-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerRegistrationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRegistrationModalPageRoutingModule {}
