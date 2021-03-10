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
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking1-sub-page/booking1-sub-page.module').then( m => m.Booking1SubPagePageModule)
  },
  {
    path: 'loyality',
    loadChildren: () => import('./loyality-sub-page/loyality-sub-page.module').then( m => m.LoyalitySubPagePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-sub-page/profile-sub-page.module').then( m => m.ProfileSubPagePageModule)
  },
  {
    path: 'Venue Selection',
    loadChildren: () => import('./location-and-time-sub-page/location-and-time-sub-page.module').then( m => m.LocationAndTimeSubPagePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home-sub-page/home-sub-page.module').then( m => m.HomeSubPagePageModule )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerNavPagePageRoutingModule {}
