import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedTicketsSubPagePageRoutingModule } from './booked-tickets-sub-page-routing.module';

import { BookedTicketsSubPagePage } from './booked-tickets-sub-page.page';
import { HeaderComponentComponent } from 'src/app/header-component/header-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookedTicketsSubPagePageRoutingModule
  ],
  declarations: [BookedTicketsSubPagePage, HeaderComponentComponent]
})
export class BookedTicketsSubPagePageModule {}
