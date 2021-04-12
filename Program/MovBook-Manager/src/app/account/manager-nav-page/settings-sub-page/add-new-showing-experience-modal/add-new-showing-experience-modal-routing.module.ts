import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewShowingExperienceModalPage } from './add-new-showing-experience-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewShowingExperienceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewShowingExperienceModalPageRoutingModule {}
