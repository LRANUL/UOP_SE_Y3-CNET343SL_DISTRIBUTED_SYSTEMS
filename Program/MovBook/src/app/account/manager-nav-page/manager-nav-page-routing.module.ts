import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerNavPagePage } from './manager-nav-page.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerNavPagePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard-sub-page/dashboard-sub-page.module').then( m => m.DashboardSubPagePageModule)
      },
      {
        path: 'browse-upcoming-movies',
        loadChildren: () => import('./browse-upcoming-movies-sub-page/browse-upcoming-movies-sub-page.module').then( m => m.BrowseUpcomingMoviesSubPagePageModule)
      },
      {
        path: 'movie-catalog',
        loadChildren: () => import('./movie-catalog-sub-page/movie-catalog-sub-page.module').then( m => m.MovieCatalogSubPagePageModule)
      },
      {
        path: 'cinema-halls',
        loadChildren: () => import('./cinema-halls-sub-page/cinema-halls-sub-page.module').then( m => m.CinemaHallsSubPagePageModule)
      },
      {
        path: 'food-and-beverages',
        loadChildren: () => import('./food-and-beverages-sub-page/food-and-beverages-sub-page.module').then( m => m.FoodAndBeveragesSubPagePageModule)
      },
      {
        path: 'manage-notifications',
        loadChildren: () => import('./manage-notifications-sub-page/manage-notifications-sub-page.module').then( m => m.ManageNotificationsSubPagePageModule)
      },
      {
        path: 'operator-accounts',
        loadChildren: () => import('./operator-accounts-sub-page/operator-accounts-sub-page.module').then( m => m.OperatorAccountsSubPagePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile-sub-page/profile-sub-page.module').then( m => m.ProfileSubPagePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings-sub-page/settings-sub-page.module').then( m => m.SettingsSubPagePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerNavPagePageRoutingModule {}
