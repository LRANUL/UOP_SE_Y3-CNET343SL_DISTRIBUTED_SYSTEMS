import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBeverageModalPage } from './update-beverage-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBeverageModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBeverageModalPageRoutingModule {}
