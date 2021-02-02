import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking1-sub-page',
  templateUrl: './booking1-sub-page.page.html',
  styleUrls: ['./booking1-sub-page.page.scss'],
})
export class Booking1SubPagePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    this.startTimer();
  }

  counter: {
    min,
    sec
  } 

  startTimer() {
    this.counter = { min: 10, sec: 0  } // Put any time you want
    let intervalId = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59;
      } 
      else this.counter.sec -= 1

    if (this.counter.min === 0 && this.counter.sec == 0)
    {
       this.route.navigateByUrl('customer/Venue Selection'); // put the url you want to navigate to
       this.counter = { min: 10, sec: 0  }
    }
    }, 1000)
  }

  cancel()
  {
    this.route.navigateByUrl('customer/Venue Selection'); 
  }


}
