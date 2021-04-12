import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpcomingMoviesTabPagePage } from './upcoming-movies-tab-page.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingMoviesTabPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingMoviesTabPagePageRoutingModule {}
