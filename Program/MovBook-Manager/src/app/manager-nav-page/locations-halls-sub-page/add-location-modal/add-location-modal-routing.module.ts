import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLocationModalPage } from './add-location-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddLocationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLocationModalPageRoutingModule {}
