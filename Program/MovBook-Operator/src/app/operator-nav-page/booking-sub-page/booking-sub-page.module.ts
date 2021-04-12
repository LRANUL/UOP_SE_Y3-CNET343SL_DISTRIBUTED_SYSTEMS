import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingSubPagePage } from './booking-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSubPagePage
  ],
  entryComponents: [BookingSubPagePage],
  declarations: [BookingSubPagePage]
})
export class Booking1SubPagePageModule {}
