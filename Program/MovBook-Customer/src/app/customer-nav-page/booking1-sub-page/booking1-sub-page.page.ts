import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CinemaHall, seating } from 'src/app/models/account/cinema-hall';
import { movie } from 'src/app/models/account/customers';
import { Movie, ticketPrices } from 'src/app/models/account/movie';
import { CustomerService } from 'src/app/services/account/customer.service';



@Component({
  selector: 'app-booking1-sub-page',
  templateUrl: './booking1-sub-page.page.html',
  styleUrls: ['./booking1-sub-page.page.scss'],
})
export class Booking1SubPagePage implements OnInit {
  seatAllocatedPositionNo: any;
  seatActive: any;
  seatUnavailable: any;

  constructor(private route: Router, private toastCtrl: ToastController, private customerService: CustomerService) { }

  ngOnInit() {
    this.startTimer();
    this.getShowingMovie();
  }

  movieDetails : Movie = {
    title: '',
    year: '',
    rated: '',
    released: '',
    runtime: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    poster: '',
    ratings: [
      {
        Source: '',
        Value: '',
      }
    ],
    metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    type: '',
    dvd: '',
    boxOffice: '',
    production: '',
    website: '',
    response: '',
  };

  // this is the showing movie collection  id
  temoryID = "6034e1156cbbfed01dacc997";
  movieId;
  hallId;
  movies : movie ={
  movieObjectId: '',
  cinemaHallObjectId: '',
  cinemaLocationObjectId: '',
  showingExperience: '',
  showingStartDate: '',
  showingEndDate: '',
  showingTime: '',
  cinemaLocationName : '',
  cinemaLocationAddress : {
    streetAddress : '',
    city : '',
    postalCode: ''
  }
  };

  tickets: ticketPrices = {
    movieObjectId: '',
    showingTimeSlot:  '',
    ticketCost: {
    adult: '',
    children: '',
  }
  };

  hallDetails : CinemaHall = {
    cinemaLocationObjectId: '',
    hallName: '',
    seatingGridNoOfRows: '',
    seatingGridNoOfColumns: '',
    seatingDetails : [{
      seatId: '',
      seatAllocatedPositionNo: '',
      seatNumber: '',
      seatActive: '',
      seatUnavailable: ''
    }]
    };
    NoOfColumns;
    NoOfRows;
    seatId;
    cinemaLocationId;
    allocatedPos;
    seatNumber;
    hall;

  Aprice;
  Cprice;
  numberoftickets = 6;
  adulttickets= this.numberoftickets;
  childrenTickets = 0
  totalammount;


  counter: {
    min,
    sec
  }

  getShowingMovie()
  {
    this.customerService.getSpecificShowingMovie(this.temoryID);
    this.customerService.getShowingMovie().subscribe((movie: movie)=> {
      this.movies = movie;
      console.log( this.movies);
      this.movieId =  movie.movieObjectId;
      this.hallId = movie.cinemaHallObjectId;
      if(this.movieId != undefined && this.hallId != undefined)
      {
        console.log(this.movieId);
        // to get the movie details for this movie
        this.getMovieAdditionalDetails(this.movieId);
        this.getmoviehall(this.hallId);
      }
      // to get the price of the movie
      this.getMoviePrices(this.temoryID);
    })
  }

  getMovieAdditionalDetails(id)
  {
    this.customerService.getMovieDetail(id);
    this.customerService.getmovies().subscribe((movies: Movie)=> {
      this.movieDetails = movies;
      console.log( this.movieDetails);
    })
  }

  seat;
  value : seating ={
    seatId: '',
    seatAllocatedPositionNo: '',
    seatNumber: '',
    seatActive: '',
    seatUnavailable: ''
  };
  seatData = new Array();
  getmoviehall(id)
  {
   this.customerService.retrieveCinemaHall(id);
   this.customerService.gethall().subscribe((hall: CinemaHall)=>{
     this.hallDetails = hall;
     this.hall = hall;
     console.log(hall);
     console.log(this.hallDetails);
     this.NoOfColumns = this.hallDetails[0].seatingGridNoOfColumns;
     this.NoOfRows = this.hallDetails[0].seatingGridNoOfRows;
     this.cinemaLocationId = this.hallDetails[0].cinemaLocationObjectId
     let value = hall[0].seatingDetails.length
     let i = 0;
     this.seat = -1;
     for(i ; i <= value; i++)
     {
     this.value = {
    seatId: this.hall[0].seatingDetails[i].seatId,
    seatAllocatedPositionNo: this.hall[0].seatingDetails[i].seatAllocatedPositionNo,
    seatNumber: this.hall[0].seatingDetails[i].seatNumber,
    seatActive:  this.hall[0].seatingDetails[i].seatActive,
    seatUnavailable:  this.hall[0].seatingDetails[i].seatUnavailable
    }
    this.seatData.push(this.value)
     this.seat = this.seat + 1;
     }
     console.log(this.seat);
     //just makes it a array for testing purposes
     let val;
     val = this.covertNumberToArray(this.NoOfColumns)
     console.log(val);

     console.log(this.NoOfColumns);
     console.log(this.NoOfRows);
   })
  }

  covertNumberToArray(value: number) {
    // Converting the 'value' parameter to an array and returning
    return new Array(value);
  }

  preIncrementValue(value: number){
    // Pre increment - incrementing one to 'value' before the execution and returning the value
    return ++value;
  }

  getMoviePrices(id)
  {
   this.customerService.getTicketPrice(id);
   this.customerService.getTicket().subscribe((ticket: ticketPrices)=> {
    this.tickets = ticket;
    this.Aprice = ticket.ticketCost.adult;
    this.Cprice = ticket.ticketCost.children;
    this.totalammount = this.numberoftickets * this.Aprice;
    console.log( this.tickets);
  })
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

  async failToast() {
    const toast = await this.toastCtrl.create({
      message: 'Please select more seats',
      duration: 2000
    });
    toast.present();
  }

  addticket()
  {
    if(this.adulttickets < this.numberoftickets && this.adulttickets <= this.numberoftickets)
    {
      let e = this.adulttickets + 1;
      this.adulttickets = e;
      let c = this.childrenTickets -1;
      this.childrenTickets = c;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }else if(this.adulttickets < this.numberoftickets)
    {
      let e = this.adulttickets + 1;
      this.adulttickets = e;

       // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }else{
      this.failToast();
    }
  }

  removeticket()
  {
    if(this.adulttickets <= this.numberoftickets && this.childrenTickets == 0 || this.childrenTickets < this.numberoftickets)
    {
      let e = this.adulttickets - 1;
      this.adulttickets = e;
      let c = this.childrenTickets + 1;
      this.childrenTickets = c;

       // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }else if(this.adulttickets < this.numberoftickets && this.childrenTickets == 0 || this.childrenTickets < this.numberoftickets)
    {
      let e = this.adulttickets - 1;
      this.adulttickets = e;

       // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }
    else
    {
     this.failToast();
    }
  }



  childrenaddticket()
  {
    if(this.childrenTickets< this.numberoftickets && this.childrenTickets <= this.numberoftickets)
    {
      let e = this.childrenTickets + 1;
      this.childrenTickets = e;
      let c = this.adulttickets -1;
      this.adulttickets = c;

       // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }else if(this.childrenTickets< this.numberoftickets)
    {
      let e = this.childrenTickets + 1;
      this.childrenTickets = e;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }else
    {
     this.failToast();
    }

  }

  childrenremoveticket()
  {
    if(this.childrenTickets <= this.numberoftickets && this.adulttickets == 0 || this.adulttickets < this.numberoftickets)
    {
      let e = this.childrenTickets - 1;
      this.childrenTickets = e;
      let c = this.adulttickets + 1;
      this.adulttickets = c;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }else if(this.childrenTickets < this.numberoftickets && this.adulttickets == 0 || this.adulttickets < this.numberoftickets)
    {
      let e = this.childrenTickets- 1;
      this.childrenTickets = e;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
    }
    else
    {
     this.failToast();
    }
  }
}
