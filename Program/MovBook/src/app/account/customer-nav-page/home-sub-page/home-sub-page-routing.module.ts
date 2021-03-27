import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSubPagePage } from './home-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSubPagePageRoutingModule {}
