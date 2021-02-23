import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-loyality-sub-page',
  templateUrl: './loyality-sub-page.page.html',
  styleUrls: ['./loyality-sub-page.page.scss'],
})
export class LoyalitySubPagePage implements OnInit {

  loyality ={
    email: '',
    pointsAvailable: '',
    totalPoints: '',
    lastDatePointsEarned: ''
  }

  temporyemail = "6031255303a242238e0c0d67";
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getinformation(this.temporyemail);
  }

  getinformation(email: any)
  {
    this.customerService.getloyality(email).subscribe(data => {
      this.loyality = 
      {
        email: data.users.email,
        pointsAvailable: data.users.pointsAvailable,
        totalPoints: data.users.totalPoints,
        lastDatePointsEarned: data.users.lastEarnedDate
      };
    });
  }

}
