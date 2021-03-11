import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMoviesTabPagePage } from './search-movies-tab-page.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMoviesTabPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMoviesTabPagePageRoutingModule {}
