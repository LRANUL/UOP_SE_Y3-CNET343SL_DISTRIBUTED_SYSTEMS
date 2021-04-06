import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardSubPagePage } from './dashboard-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardSubPagePageRoutingModule {}
