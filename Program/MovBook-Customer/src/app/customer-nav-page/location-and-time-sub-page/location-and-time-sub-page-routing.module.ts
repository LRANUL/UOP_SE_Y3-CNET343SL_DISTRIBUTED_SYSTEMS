import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationAndTimeSubPagePage } from './location-and-time-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: LocationAndTimeSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationAndTimeSubPagePageRoutingModule {}
