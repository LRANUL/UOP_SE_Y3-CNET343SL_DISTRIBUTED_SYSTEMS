import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutusSubPagePage } from './aboutus-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: AboutusSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutusSubPagePageRoutingModule {}
