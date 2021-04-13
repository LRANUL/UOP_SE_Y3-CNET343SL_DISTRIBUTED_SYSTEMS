import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLocationModalPage } from './edit-location-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditLocationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLocationModalPageRoutingModule {}
