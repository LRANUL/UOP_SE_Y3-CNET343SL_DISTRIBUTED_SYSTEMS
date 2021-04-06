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
  temoryemail = '601b954d9e31d20c746f6840';

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getbookedtickets(this.temoryemail);
  }

  checker = false;
  getbookedtickets(id) {
    this.customerService.getbookinghistory(id);
    this.customerService.gettickets().subscribe((data: bookedTickets) => {
      this.bookedticket = data;
      console.log(this.bookedticket);
    });
  }
}
