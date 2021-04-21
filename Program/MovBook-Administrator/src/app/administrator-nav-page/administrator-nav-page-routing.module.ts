import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministratorNavPagePage } from './administrator-nav-page.page';

const routes: Routes = [
  {
    path: 'administrator',
    component: AdministratorNavPagePage
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard-sub-page/dashboard-sub-page.module').then( m => m.DashboardSubPagePageModule)
  },
  {
    path: 'manager-accounts',
    loadChildren: () => import('./manager-accounts-sub-page/manager-accounts-sub-page.module').then( m => m.ManagerAccountsSubPagePageModule)
  },
  {
    path: 'profile-sub-page',
    loadChildren: () => import('./profile-sub-page/profile-sub-page.module').then( m => m.ProfileSubPagePageModule)
  },
  {
    path: 'settings-sub-page',
    loadChildren: () => import('./settings-sub-page/settings-sub-page.module').then( m => m.SettingsSubPagePageModule)
  },
  {
    path: '',
    redirectTo: '/administrator/dashboard',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorNavPagePageRoutingModule {}
