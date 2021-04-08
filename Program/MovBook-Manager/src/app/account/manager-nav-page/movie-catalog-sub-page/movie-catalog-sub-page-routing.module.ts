import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieCatalogSubPagePage } from './movie-catalog-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: MovieCatalogSubPagePage,
    children: [
      {
        path: 'upcoming-movies',
        loadChildren: () => import('./upcoming-movies-tab-page/upcoming-movies-tab-page.module').then( m => m.UpcomingMoviesTabPagePageModule)
      },
      {
        path: 'now-showing-movies',
        loadChildren: () => import('./now-showing-movies-tab-page/now-showing-movies-tab-page.module').then( m => m.NowShowingMoviesTabPagePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieCatalogSubPagePageRoutingModule {}
