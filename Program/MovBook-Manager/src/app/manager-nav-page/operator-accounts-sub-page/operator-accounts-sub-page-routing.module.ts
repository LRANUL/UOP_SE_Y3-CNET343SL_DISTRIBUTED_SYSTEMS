import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatorAccountsSubPagePage } from './operator-accounts-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: OperatorAccountsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorAccountsSubPagePageRoutingModule {}
