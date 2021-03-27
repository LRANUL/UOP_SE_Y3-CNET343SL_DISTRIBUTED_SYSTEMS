import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHallModalPage } from './add-hall-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddHallModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHallModalPageRoutingModule {}
