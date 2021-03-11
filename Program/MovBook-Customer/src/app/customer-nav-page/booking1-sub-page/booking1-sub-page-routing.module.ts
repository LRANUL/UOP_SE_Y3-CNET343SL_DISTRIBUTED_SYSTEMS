import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Booking1SubPagePage } from './booking1-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: Booking1SubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Booking1SubPagePageRoutingModule {}
