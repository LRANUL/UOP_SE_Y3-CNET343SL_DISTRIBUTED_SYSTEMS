import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailsModalPage } from './movie-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MovieDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailsModalPageRoutingModule {}
