import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { loyality } from 'src/app/models/account/customers';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-loyality-sub-page',
  templateUrl: './loyality-sub-page.page.html',
  styleUrls: ['./loyality-sub-page.page.scss'],
})
export class LoyalitySubPagePage implements OnInit {

    loyality: loyality ={
        email: '',
        pointsAvailable: '',
        totalPoints: '',
        lastEarnedDate: ''
    }

  temporyemail = "6031255303a242238e0c0d67";
  pipe = new DatePipe("en-US");
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getinformation(this.temporyemail);
  }

  getinformation(email: any)
  {
    this.customerService.getloyality(email)
    this.customerService.getloyalitys().subscribe((data: loyality )=> {
      let date = this.pipe.transform(data[0].lastEarnedDate, "mediumDate");
      console.log(date)
      this.loyality =
      {
        email: data[0].email,
        pointsAvailable: data[0].pointsAvailable,
        totalPoints: data[0].totalPoints,
        lastEarnedDate: date
      };
      console.log(this.loyality);
    });
  }

}
