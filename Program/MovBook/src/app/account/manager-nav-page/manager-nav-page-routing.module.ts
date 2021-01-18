import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerNavPagePage } from './manager-nav-page.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerNavPagePage
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard-sub-page/dashboard-sub-page.module').then( m => m.DashboardSubPagePageModule)
  },
  {
    path: 'movie-catalog',
    loadChildren: () => import('./movie-catalog-sub-page/movie-catalog-sub-page.module').then( m => m.MovieCatalogSubPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerNavPagePageRoutingModule {}
