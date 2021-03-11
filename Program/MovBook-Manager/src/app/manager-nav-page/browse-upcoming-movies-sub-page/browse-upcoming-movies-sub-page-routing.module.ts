import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseUpcomingMoviesSubPagePage } from './browse-upcoming-movies-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseUpcomingMoviesSubPagePage,
    children: [
      {
        path: 'search-movies',
        loadChildren: () => import('./search-movies-tab-page/search-movies-tab-page.module').then( m => m.SearchMoviesTabPagePageModule)
      },
      {
        path: 'movie-waitlist',
        loadChildren: () => import('./movie-waitlist-tab-page/movie-waitlist-tab-page.module').then( m => m.MovieWaitlistTabPagePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseUpcomingMoviesSubPagePageRoutingModule {}
