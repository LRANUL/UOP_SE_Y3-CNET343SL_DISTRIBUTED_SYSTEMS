import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedTicketsSubPagePage } from './booked-tickets-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: BookedTicketsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedTicketsSubPagePageRoutingModule {}
