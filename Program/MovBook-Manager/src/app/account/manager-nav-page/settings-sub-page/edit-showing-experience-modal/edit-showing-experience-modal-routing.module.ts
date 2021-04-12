import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditShowingExperienceModalPage } from './edit-showing-experience-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditShowingExperienceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditShowingExperienceModalPageRoutingModule {}
