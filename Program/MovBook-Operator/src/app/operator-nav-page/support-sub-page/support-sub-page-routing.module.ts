import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportSubPagePage } from './support-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: SupportSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportSubPagePageRoutingModule {}
