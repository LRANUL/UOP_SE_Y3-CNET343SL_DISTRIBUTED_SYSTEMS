import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchlistSubPagePageRoutingModule } from './watchlist-sub-page-routing.module';

import { WatchlistSubPagePage } from './watchlist-sub-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchlistSubPagePageRoutingModule
  ],
  declarations: [WatchlistSubPagePage]
})
export class WatchlistSubPagePageModule {}
