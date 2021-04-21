import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailSubPagePage } from './movie-detail-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: MovieDetailSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailSubPagePageRoutingModule {}
