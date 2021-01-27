import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactUsSubPagePage } from './contact-us-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: ContactUsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsSubPagePageRoutingModule {}
