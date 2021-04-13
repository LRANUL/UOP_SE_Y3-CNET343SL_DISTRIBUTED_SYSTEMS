import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBeverageModalPage } from './add-beverage-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddBeverageModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBeverageModalPageRoutingModule {}
