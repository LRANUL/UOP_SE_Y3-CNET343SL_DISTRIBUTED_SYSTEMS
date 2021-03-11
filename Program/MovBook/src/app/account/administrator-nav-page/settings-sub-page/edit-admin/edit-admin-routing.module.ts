import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdminPage } from './edit-admin.page';

const routes: Routes = [
  {
    path: '',
    component: EditAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAdminPageRoutingModule {}
