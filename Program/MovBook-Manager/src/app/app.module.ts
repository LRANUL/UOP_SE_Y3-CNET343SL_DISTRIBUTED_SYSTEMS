import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { MovieDetailsModalPageModule } from './account/manager-nav-page/browse-upcoming-movies-sub-page/movie-details-modal/movie-details-modal.module';
import { MovieCatalogTypesPopoverPageModule } from './account/manager-nav-page/browse-upcoming-movies-sub-page/movie-catalog-types-popover/movie-catalog-types-popover.module';
import { AddHallModalPageModule } from './account/manager-nav-page/locations-halls-sub-page/add-hall-modal/add-hall-modal.module';
import { AssignHallSeatPopoverPageModule } from './account/manager-nav-page/locations-halls-sub-page/assign-hall-seat-popover/assign-hall-seat-popover.module';
import { AddLocationModalPageModule } from './account/manager-nav-page/locations-halls-sub-page/add-location-modal/add-location-modal.module';
import { CinemaHallsModalPageModule } from './account/manager-nav-page/locations-halls-sub-page/cinema-halls-modal/cinema-halls-modal.module';
import { AddNewShowingModalPageModule } from './account/manager-nav-page/movie-catalog-sub-page/add-new-showing-modal/add-new-showing-modal.module';
import { AddNewShowingExperienceModalPageModule } from './account/manager-nav-page/settings-sub-page/add-new-showing-experience-modal/add-new-showing-experience-modal.module';
import { UpdateAccountDetailsModalPageModule } from './account/manager-nav-page/settings-sub-page/update-account-details-modal/update-account-details-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
      MovieCatalogTypesPopoverPageModule,
      MovieDetailsModalPageModule,
      AddHallModalPageModule,
      AssignHallSeatPopoverPageModule,
      AddLocationModalPageModule,
      CinemaHallsModalPageModule,
      AddNewShowingModalPageModule,
      AddNewShowingExperienceModalPageModule,
      UpdateAccountDetailsModalPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
