import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignHallSeatPopoverPageRoutingModule } from './assign-hall-seat-popover-routing.module';

import { AssignHallSeatPopoverPage } from './assign-hall-seat-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AssignHallSeatPopoverPageRoutingModule
  ],
  declarations: [AssignHallSeatPopoverPage]
})
export class AssignHallSeatPopoverPageModule {}
