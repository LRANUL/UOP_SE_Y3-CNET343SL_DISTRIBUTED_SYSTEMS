import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { movie } from 'src/app/models/account/customers';
import { Movie, ticketPrices } from 'src/app/models/account/movie';
import { CustomerService } from 'src/app/services/account/customer.service';



@Component({
  selector: 'app-booking1-sub-page',
  templateUrl: './booking1-sub-page.page.html',
  styleUrls: ['./booking1-sub-page.page.scss'],
})
export class Booking1SubPagePage implements OnInit {

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
  movies : movie ={
  movieObjectId: '',
  cinemaHallObjectId: '',
  cinemaLocationObjectId: '',
  showingExperience: '',
  showingStartDate: '',
  showingEndDate: '',
  showingTime: ''
  };

  tickets: ticketPrices = {
    movieObjectId: '',
    showingTimeSlot:  '',
    ticketCost: {
    adult: '',
    children: '',
  }
  };

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
      if(this.movieId != undefined)
      {
        console.log(this.movieId);
        this.getMovieAdditionalDetails(this.movieId);
      }
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
