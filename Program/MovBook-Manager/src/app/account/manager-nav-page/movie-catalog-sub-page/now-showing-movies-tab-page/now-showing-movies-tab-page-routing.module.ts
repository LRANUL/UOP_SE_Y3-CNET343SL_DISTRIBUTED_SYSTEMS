import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NowShowingMoviesTabPagePage } from './now-showing-movies-tab-page.page';

const routes: Routes = [
  {
    path: '',
    component: NowShowingMoviesTabPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NowShowingMoviesTabPagePageRoutingModule {}
