import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieWaitlistTabPagePage } from './movie-waitlist-tab-page.page';

const routes: Routes = [
  {
    path: '',
    component: MovieWaitlistTabPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieWaitlistTabPagePageRoutingModule {}
