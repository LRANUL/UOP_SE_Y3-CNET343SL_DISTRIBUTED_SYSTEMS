import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewShowingModalPage } from './add-new-showing-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewShowingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewShowingModalPageRoutingModule {}
