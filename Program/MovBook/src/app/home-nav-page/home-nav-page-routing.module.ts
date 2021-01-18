import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeNavPagePage } from './home-nav-page.page';

const routes: Routes = [
  {
    path: '',
    component: HomeNavPagePage
  },
  {
    path: 'home-sub-page',
    loadChildren: () => import('./home-sub-page/home-sub-page.module').then( m => m.HomeSubPagePageModule)
  },
  {
    path: 'movies-sub-page',
    loadChildren: () => import('./movies-sub-page/movies-sub-page.module').then( m => m.MoviesSubPagePageModule)
  },
  {
    path: 'aboutus-sub-page',
    loadChildren: () => import('./aboutus-sub-page/aboutus-sub-page.module').then( m => m.AboutusSubPagePageModule)
  },
  {
    path: 'contactus-sub-page',
    loadChildren: () => import('./contactus-sub-page/contactus-sub-page.module').then( m => m.ContactusSubPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeNavPagePageRoutingModule {}
