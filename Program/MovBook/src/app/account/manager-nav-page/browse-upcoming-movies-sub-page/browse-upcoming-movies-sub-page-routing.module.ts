import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseUpcomingMoviesSubPagePage } from './browse-upcoming-movies-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseUpcomingMoviesSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseUpcomingMoviesSubPagePageRoutingModule {}
