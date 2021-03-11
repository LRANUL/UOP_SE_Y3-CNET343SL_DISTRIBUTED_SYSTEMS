import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsSubPagePage } from './settings-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsSubPagePage
  },  {
    path: 'edit-admin',
    loadChildren: () => import('./edit-admin/edit-admin.module').then( m => m.EditAdminPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsSubPagePageRoutingModule {}
