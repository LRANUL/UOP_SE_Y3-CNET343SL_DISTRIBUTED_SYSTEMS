import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterOperatorAccountModalPage } from './register-operator-account-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterOperatorAccountModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterOperatorAccountModalPageRoutingModule {}
