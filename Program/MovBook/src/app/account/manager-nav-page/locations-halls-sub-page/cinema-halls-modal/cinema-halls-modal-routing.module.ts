import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CinemaHallsModalPage } from './cinema-halls-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CinemaHallsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaHallsModalPageRoutingModule {}
