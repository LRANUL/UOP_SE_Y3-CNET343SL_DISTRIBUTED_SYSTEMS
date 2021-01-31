import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerAccountsSubPagePage } from './manager-accounts-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerAccountsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerAccountsSubPagePageRoutingModule {}
