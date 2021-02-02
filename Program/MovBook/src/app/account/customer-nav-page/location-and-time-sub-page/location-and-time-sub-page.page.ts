import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-and-time-sub-page',
  templateUrl: './location-and-time-sub-page.page.html',
  styleUrls: ['./location-and-time-sub-page.page.scss'],
})
export class LocationAndTimeSubPagePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  gotourl()
  {
   this.route.navigateByUrl('customer/booking');
  }


}
