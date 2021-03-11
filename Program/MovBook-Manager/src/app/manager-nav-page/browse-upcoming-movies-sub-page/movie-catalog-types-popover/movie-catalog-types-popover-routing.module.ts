import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieCatalogTypesPopoverPage } from './movie-catalog-types-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MovieCatalogTypesPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieCatalogTypesPopoverPageRoutingModule {}
