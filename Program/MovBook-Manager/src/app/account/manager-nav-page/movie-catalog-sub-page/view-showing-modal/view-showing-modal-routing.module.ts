import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewShowingModalPage } from './view-showing-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewShowingModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewShowingModalPageRoutingModule {}
