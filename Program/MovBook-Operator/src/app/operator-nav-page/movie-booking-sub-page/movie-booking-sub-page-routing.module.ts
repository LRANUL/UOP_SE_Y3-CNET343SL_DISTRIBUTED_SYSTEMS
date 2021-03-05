import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieBookingSubPagePage } from './movie-booking-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: MovieBookingSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieBookingSubPagePageRoutingModule {}
