import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchlistSubPagePage } from './watchlist-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: WatchlistSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistSubPagePageRoutingModule {}
