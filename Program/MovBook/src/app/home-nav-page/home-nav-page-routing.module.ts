import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeNavPagePage } from './home-nav-page.page';

const routes: Routes = [
  {
    path: '',
    component: HomeNavPagePage
  },
  {
    path: 'movies-sub-page',
    loadChildren: () => import('./movies-sub-page/movies-sub-page.module').then( m => m.MoviesSubPagePageModule)
  },
  {
    path: 'about us',
    loadChildren: () => import('./about-us-sub-page/about-us-sub-page.module').then( m => m.AboutUsSubPagePageModule)
  },
  {
    path: 'loyality information',
    loadChildren: () => import('./loyality-information-sub-page/loyality-information-sub-page.module').then( m => m.LoyalityInformationSubPagePageModule)
  },
  {
    path: 'movie details/:id',
    loadChildren: () => import('./movie-detail-sub-page/movie-detail-sub-page.module').then( m => m.MovieDetailSubPagePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeNavPagePageRoutingModule {}
