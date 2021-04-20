import { Component, OnInit } from '@angular/core';
import { CinemaHall } from 'src/app/models/account/cinema-hall';
import { CinemaLocation } from 'src/app/models/account/cinema-location';
import {
  bookedTickets,
  bookedTicketsDetails,
} from 'src/app/models/account/customers';
import { Movie } from 'src/app/models/account/movie';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-booked-tickets-sub-page',
  templateUrl: './booked-tickets-sub-page.page.html',
  styleUrls: ['./booked-tickets-sub-page.page.scss'],
})
export class BookedTicketsSubPagePage implements OnInit {
  bookedticket;
  bookedTicketInfo = new Array();
  temoryemail = "john@movbook.com";

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getbookedtickets(this.temoryemail);
  }

  totalTickets;
  checker = false;
  getbookedtickets(email) {
    this.customerService.getbookinghistory(email);
    this.customerService.gettickets().subscribe((data: bookedTickets) => {
      this.bookedticket = data;
      let adult = data[0].movieTickets.adultQuantity;
      let children = data[0].movieTickets.childQuantity;
      this.totalTickets = +adult + +children;
    });
  }
}
