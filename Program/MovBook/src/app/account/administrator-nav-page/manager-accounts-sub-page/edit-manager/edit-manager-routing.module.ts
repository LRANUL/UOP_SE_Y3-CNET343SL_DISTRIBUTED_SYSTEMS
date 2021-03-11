import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditManagerPage } from './edit-manager.page';

const routes: Routes = [
  {
    path: '',
    component: EditManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditManagerPageRoutingModule {}
