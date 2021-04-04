import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsHallsSubPagePage } from './locations-halls-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: LocationsHallsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsHallsSubPagePageRoutingModule {}
