import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedTicketsSubPagePageRoutingModule } from './booked-tickets-sub-page-routing.module';

import { BookedTicketsSubPagePage } from './booked-tickets-sub-page.page';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookedTicketsSubPagePageRoutingModule
  ],
  declarations: [BookedTicketsSubPagePage, HeaderComponent]
})
export class BookedTicketsSubPagePageModule {}
