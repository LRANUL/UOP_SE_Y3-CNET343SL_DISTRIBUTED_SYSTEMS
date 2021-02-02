import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyalityInformationSubPagePage } from './loyality-information-sub-page.page';

const routes: Routes = [
  {
    path: '',
    component: LoyalityInformationSubPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyalityInformationSubPagePageRoutingModule {}