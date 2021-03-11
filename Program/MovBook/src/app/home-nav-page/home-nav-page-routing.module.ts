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
    path: 'contact-us-sub-page',
    loadChildren: () => import('./contact-us-sub-page/contact-us-sub-page.module').then( m => m.ContactUsSubPagePageModule)
  },
  {
    path: 'about-us-sub-page',
    loadChildren: () => import('./about-us-sub-page/about-us-sub-page.module').then( m => m.AboutUsSubPagePageModule)
  },  {
    path: 'loyality-information-sub-page',
    loadChildren: () => import('./loyality-information-sub-page/loyality-information-sub-page.module').then( m => m.LoyalityInformationSubPagePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeNavPagePageRoutingModule {}
