import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerAccountsSubPagePage } from './manager-accounts-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerAccountsSubPagePage
  },
  {
    path: 'edit-manager',
    loadChildren: () => import('./edit-manager/edit-manager.module').then( m => m.EditManagerPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerAccountsSubPagePageRoutingModule {}
