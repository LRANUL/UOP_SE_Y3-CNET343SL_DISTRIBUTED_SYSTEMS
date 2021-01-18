import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactusSubPagePage } from './contactus-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: ContactusSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactusSubPagePageRoutingModule {}
