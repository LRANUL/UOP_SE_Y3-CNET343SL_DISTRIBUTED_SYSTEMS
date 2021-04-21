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
    path: 'booking/:id',
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
    path: 'Venue Selection/:id',
    loadChildren: () => import('./location-and-time-sub-page/location-and-time-sub-page.module').then( m => m.LocationAndTimeSubPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerNavPagePageRoutingModule {}
