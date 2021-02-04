import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsHallsSubPagePage } from './locations-halls-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: LocationsHallsSubPagePage
  },
  {
    path: 'cinema-halls-modal',
    loadChildren: () => import('./cinema-halls-modal/cinema-halls-modal.module').then( m => m.CinemaHallsModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsHallsSubPagePageRoutingModule {}
