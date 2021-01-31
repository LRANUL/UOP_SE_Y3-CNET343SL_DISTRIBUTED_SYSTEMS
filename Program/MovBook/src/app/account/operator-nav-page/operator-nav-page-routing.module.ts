import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatorNavPagePage } from './operator-nav-page.page';

const routes: Routes = [
  {
    path: 'operator',
    component: OperatorNavPagePage,
    // children: [
    //   {
    //     path: 'dashboard',
    //     loadChildren: 'dashboard-sub-page/dashboard-sub-page.module#DashboardSubPagePageModule'
    //   },
    //   {
    //     path: 'movie-booking',
    //     loadChildren: 'movie-booking-sub-page/movie-booking-sub-page.module#MovieBookingSubPagePageModule'
    //   },
    // ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard-sub-page/dashboard-sub-page.module').then(m => m.DashboardSubPagePageModule)
  },
  {
    path: 'movie-booking',
    loadChildren: () => import('./movie-booking-sub-page/movie-booking-sub-page.module').then(m => m.MovieBookingSubPagePageModule)
  },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./profile-sub-page/profile-sub-page.module').then( m => m.ProfileSubPagePageModule)
  // },
  {
    path: 'settings',
    loadChildren: () => import('./setting-sub-page/setting-sub-page.module').then( m => m.SettingSubPagePageModule)
  },
  {
    path:'',
    redirectTo:'/operator/dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorNavPagePageRoutingModule { }
