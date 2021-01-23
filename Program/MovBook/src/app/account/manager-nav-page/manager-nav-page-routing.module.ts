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
        path: 'browse-upcoming-movies-sub-page',
        loadChildren: () => import('./browse-upcoming-movies-sub-page/browse-upcoming-movies-sub-page.module').then( m => m.BrowseUpcomingMoviesSubPagePageModule)
      },
      {
        path: 'movie-catalog',
        loadChildren: () => import('./movie-catalog-sub-page/movie-catalog-sub-page.module').then( m => m.MovieCatalogSubPagePageModule)
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerNavPagePageRoutingModule {}
