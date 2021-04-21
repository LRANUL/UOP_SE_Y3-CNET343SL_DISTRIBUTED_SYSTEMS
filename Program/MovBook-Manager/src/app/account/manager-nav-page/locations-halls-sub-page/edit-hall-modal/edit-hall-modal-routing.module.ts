import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHallModalPage } from './edit-hall-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditHallModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHallModalPageRoutingModule {}
