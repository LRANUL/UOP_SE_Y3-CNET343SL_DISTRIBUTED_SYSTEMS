import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeNavPagePage } from './home-nav-page.page';

const routes: Routes = [
  {
    path: '',
    component: HomeNavPagePage
  },
  {
    path: 'movie details/:id',
    loadChildren: () => import('./movie-detail-sub-page/movie-detail-sub-page.module').then( m => m.MovieDetailSubPagePageModule)
  },  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeNavPagePageRoutingModule {}
