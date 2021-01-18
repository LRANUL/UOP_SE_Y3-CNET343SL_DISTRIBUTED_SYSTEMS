import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesSubPagePage } from './movies-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesSubPagePageRoutingModule {}
