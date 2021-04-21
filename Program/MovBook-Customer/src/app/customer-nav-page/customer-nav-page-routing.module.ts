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
  },
  {
    path: 'home',
    loadChildren: () => import('./home-sub-page/home-sub-page.module').then( m => m.HomeSubPagePageModule )
  },
  {
    path: 'movie details/:id',
    loadChildren: () => import('./movie-detail-sub-page/movie-detail-sub-page.module').then( m => m.MovieDetailSubPagePageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerNavPagePageRoutingModule {}
