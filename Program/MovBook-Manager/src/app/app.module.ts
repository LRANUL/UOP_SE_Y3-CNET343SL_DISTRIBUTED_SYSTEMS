import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MovieDetailsModalPageModule } from './account/manager-nav-page/browse-upcoming-movies-sub-page/movie-details-modal/movie-details-modal.module';
import { MovieCatalogTypesPopoverPageModule } from './account/manager-nav-page/browse-upcoming-movies-sub-page/movie-catalog-types-popover/movie-catalog-types-popover.module';
import { AddHallModalPageModule } from './account/manager-nav-page/locations-halls-sub-page/add-hall-modal/add-hall-modal.module';
import { AssignHallSeatPopoverPageModule } from './account/manager-nav-page/locations-halls-sub-page/assign-hall-seat-popover/assign-hall-seat-popover.module';
import { AddLocationModalPageModule } from './account/manager-nav-page/locations-halls-sub-page/add-location-modal/add-location-modal.module';
import { CinemaHallsModalPageModule } from './account/manager-nav-page/locations-halls-sub-page/cinema-halls-modal/cinema-halls-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
      MovieCatalogTypesPopoverPageModule,
      MovieDetailsModalPageModule,
      AddHallModalPageModule,
      AssignHallSeatPopoverPageModule,
      AddLocationModalPageModule,
      CinemaHallsModalPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
