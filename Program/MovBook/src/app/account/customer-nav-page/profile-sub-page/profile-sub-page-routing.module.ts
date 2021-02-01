import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSubPagePage } from './profile-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSubPagePageRoutingModule {}
