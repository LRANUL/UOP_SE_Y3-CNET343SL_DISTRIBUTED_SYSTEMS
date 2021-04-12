import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationAndTimeSubPagePage } from './location-and-time-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  entryComponents: [LocationAndTimeSubPagePage],
  declarations: [LocationAndTimeSubPagePage]
})
export class LocationAndTimeSubPagePageModule {}
