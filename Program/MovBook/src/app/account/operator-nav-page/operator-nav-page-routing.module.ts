import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatorNavPagePage } from './operator-nav-page.page';

const routes: Routes = [
  {
    path: '',
    component: OperatorNavPagePage
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard-sub-page/dashboard-sub-page.module').then( m => m.DashboardSubPagePageModule)
  },
  {
    path: 'movie-booking',
    loadChildren: () => import('./movie-booking-sub-page/movie-booking-sub-page.module').then( m => m.MovieBookingSubPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorNavPagePageRoutingModule {}
