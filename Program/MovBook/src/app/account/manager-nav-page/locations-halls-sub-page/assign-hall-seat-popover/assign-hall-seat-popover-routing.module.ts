import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignHallSeatPopoverPage } from './assign-hall-seat-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AssignHallSeatPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignHallSeatPopoverPageRoutingModule {}
