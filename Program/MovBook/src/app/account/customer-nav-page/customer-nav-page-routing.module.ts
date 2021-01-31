import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerNavPagePage } from './customer-nav-page.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerNavPagePage
  },
  {
    path: 'booked-tickets',
    loadChildren: () => import('./booked-tickets-sub-page/booked-tickets-sub-page.module').then( m => m.BookedTicketsSubPagePageModule)
  },
  {
    path: 'watchlist',
    loadChildren: () => import('./watchlist-sub-page/watchlist-sub-page.module').then( m => m.WatchlistSubPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerNavPagePageRoutingModule {}
