import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageNotificationsSubPagePage } from './manage-notifications-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: ManageNotificationsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageNotificationsSubPagePageRoutingModule {}
