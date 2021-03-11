import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieCatalogSubPagePage } from './movie-catalog-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: MovieCatalogSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieCatalogSubPagePageRoutingModule {}
