import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-booked-tickets-sub-page',
  templateUrl: './booked-tickets-sub-page.page.html',
  styleUrls: ['./booked-tickets-sub-page.page.scss'],
})
export class BookedTicketsSubPagePage implements OnInit {

  constructor(private customerService: CustomerService) { 

  }

  bookedTickets: [] = [];

  temoryemail = "john@movbook.com";

  ngOnInit() {
   this.getinformation(this.temoryemail);
  }

  getinformation(email: any)
  {
    this.customerService.getbookinghistory(email);
    this.customerService.gettickets().subscribe((data:[]) => {
    this.bookedTickets = data
    });
  }
  
}
