import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CinemaHallsSubPagePage } from './cinema-halls-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: CinemaHallsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaHallsSubPagePageRoutingModule {}
