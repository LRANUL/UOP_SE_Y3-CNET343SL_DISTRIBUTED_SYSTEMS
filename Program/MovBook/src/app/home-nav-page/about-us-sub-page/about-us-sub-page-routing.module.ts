import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsSubPagePage } from './about-us-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: AboutUsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsSubPagePageRoutingModule {}
