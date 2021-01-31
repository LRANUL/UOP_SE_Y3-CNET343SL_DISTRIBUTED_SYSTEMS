import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsSubPagePage } from './settings-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsSubPagePageRoutingModule {}
