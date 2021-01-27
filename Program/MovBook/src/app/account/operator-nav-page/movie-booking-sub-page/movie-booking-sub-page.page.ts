import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-movie-booking-sub-page',
  templateUrl: './movie-booking-sub-page.page.html',
  styleUrls: ['./movie-booking-sub-page.page.scss'],
})
export class MovieBookingSubPagePage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

}
