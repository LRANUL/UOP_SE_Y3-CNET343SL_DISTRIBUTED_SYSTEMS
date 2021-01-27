import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingSubPagePage } from './setting-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: SettingSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingSubPagePageRoutingModule {}
