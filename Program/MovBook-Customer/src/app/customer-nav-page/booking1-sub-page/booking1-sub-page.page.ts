import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CinemaHall, seatingData, showingCinemaHall } from 'src/app/models/account/cinema-hall';
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

  time;
  constructor(private route: Router, private toastCtrl: ToastController, private customerService: CustomerService, private router: ActivatedRoute) {
    this.router.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation().extras.state) {
        this.time = this.route.getCurrentNavigation().extras.state.Time;
      }
    });
   }

  ngOnInit() {
    this.showingSlot = this.router.snapshot.paramMap.get('id');
    this.startTimer();
    console.log(this.time)
    console.log(this.showingSlot + " showing slot ID")
    this.getShowingMovieHall(this.showingSlot);
  }

  movieDetails : Movie = {
    movieStatus: '',
    movieTitle: '',
    rated: '',
    releasedYear: '',
    releasedDate: '',
    movieRuntime: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    posterLink: '',
    ratings: [
      {
        Source: '',
        Value: '',
      }
    ],
    imdb: {
      imdbID: '',
      imdbRating: '',
      imdbVotes: '',
    },
    boxOffice: '',
    production: '',
    website: ''
  };

  // this is the showing movie collection  id
  movieId;
  showingMovieId;
  showingSlot;
  hallId;
  movies : movie ={
    movieObjectId: '',
    cinemaHallObjectId: '',
    cinemaLocation: {
    cinemaLocationObjectId : '',
    cinemaLocationName : '',
    cinemaLocationAddress : {
      streetAddress : '',
      city : '',
      postalCode: '',
    }
  },
    showingStartDate: '',
    showingEndDate: '',
    showingSlots: [{
    _id: '',
    showingExperience: '',
    showingDate: '',
    timeSlotStartTime: '',
    timeSlotEndTime: '',
    adultsTicketFeeLKR: '',
    childrenTicketFeeLKR: ''
    }]
  };

  tickets: ticketPrices = {
    movieObjectId: '',
    showingTimeSlot:  '',
    ticketCost: {
    adult: '',
    children: '',
  }
  };

  showingHallDetails: showingCinemaHall = {
  showingCinemaHallObjectId: '',
  slotObjectId: '',
  showingMovieObjectId: '',
  cinemaHallObjectID: '',
  cinemaLocationObjectId : '',
  showingSeatDetails : [
    {
      seatObjectId: '',
      seatId : '',
      seatNumber: '',
      seatUnavailable: '',
      seatStatus : '',
      seatType : '',
      customerObjectId : '',
    }
  ]
  };

  hallDetails : CinemaHall = {
    cinemaLocationObjectId: '',
    cinemaHallName: '',
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
    hallinfo;
    NoOfColumns;
    NoOfRows;
    cinemaLocationId;
    allocatedPos;
    hall;
    hallName;

  Aprice;
  Cprice;
  numberoftickets = 0;
  adulttickets= this.numberoftickets;
  childrenTickets = 0
  totalammount;
  seat;

  seatinfo : seatingData ={
    seatObjectId: '',
    seatId: '',
    seatNumber: '',
    seatUnavailable: '',
    seatStatus : '',
    seatActive: '',
    customerObjectId: ''
  };

  seatData = new Array();

  counter: {
    min,
    sec
  }

  //this is the object that will be used to send data to part B of the booking
  allticketInformation: any ={
    movieInfo: {},
    showingMovieInfo: {},
    ticketDetalis: {},
    hallInformaion: {
      seatNumbers: '',
      adultTickets : '',
      childrenTicket: '',
      totalAmount: ''
    }
  }

  getShowingMovieHall(id)
  {
   this.customerService.retrieveShowingCinemaHall(id);
   this.customerService.getShowingCinemaHall().subscribe((cinemaHall: showingCinemaHall)=> {
   this.showingHallDetails = cinemaHall;
   this.hallinfo = cinemaHall
   this.showingMovieId = cinemaHall[0].showingMovieObjectId;
   console.log(this.showingMovieId);
   this.getShowingMovie(this.showingMovieId);
   let value = this.hallinfo[0].showingSeatDetails.length
     let i = 0;
     this.seat = -1;
     for(i ; i < value; i++)
     {
      this.seatinfo = {
        seatObjectId:  this.hallinfo[0].showingSeatDetails[i]._id,
        seatId: this.hallinfo[0].showingSeatDetails[i].seatId,
        seatNumber: this.hallinfo[0].showingSeatDetails[i].seatNumber,
        seatUnavailable: this.hallinfo[0].showingSeatDetails[i].seatUnavailable,
        seatStatus : this.hallinfo[0].showingSeatDetails[i].seatStatus,
        seatActive : this.hallinfo[0].showingSeatDetails[i].seatActive,
        customerObjectId : this.hallinfo[0].showingSeatDetails[i].customerObjectId
    }
    this.seatData.push(this.seatinfo)
     this.seat = this.seat + 1;
    }
   })
  }

  //get the showing movie details from the database using the movie ID
  getShowingMovie(id)
  {
    this.customerService.getSpecificShowingMovie(id);
    this.customerService.getShowingMovie().subscribe((movie: movie)=> {
      this.movies = movie;
      this.movieId =  movie.movieObjectId;
      this.hallId = movie.cinemaHallObjectId;
      this.Aprice = movie.showingSlots[0].adultsTicketFeeLKR;
      this.Cprice = movie.showingSlots[0].childrenTicketFeeLKR;
      this.totalammount = this.numberoftickets * this.Aprice;
      this.allticketInformation.showingMovieInfo = movie;
      if(this.movieId != undefined && this.hallId != undefined)
      {
        // to get the movie details for this movie
        this.getMovieAdditionalDetails(this.movieId);
        this.getmoviehall(this.hallId);
      }
    })
  }

  // get the movie details from the databse about the movie
  getMovieAdditionalDetails(id)
  {
    this.customerService.getMovieDetail(id);
    this.customerService.getmovies().subscribe((movies: Movie)=> {
      this.movieDetails = movies;
      this.allticketInformation.movieInfo = movies
      console.log( this.movieDetails);
    })
  }

  //Get the movie hall details for the showing movie
  getmoviehall(id)
  {
     this.customerService.retrieveCinemaHall(id);
     this.customerService.gethall().subscribe((hall: CinemaHall)=>{
     this.hallDetails = hall;
     this.allticketInformation.hallInformaion = hall;
     this.hall = hall;
     this.hallName = this.hallDetails[0].cinemaHallName
     this.NoOfColumns = this.hallDetails[0].seatingGridNoOfColumns;
     this.NoOfRows = this.hallDetails[0].seatingGridNoOfRows;
     this.cinemaLocationId = this.hallDetails[0].cinemaLocationObjectId
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

  data = [];
  bookingTicket(Seatid, SeatNumber, SeatStatus)
  {
    if(SeatStatus != "Booked")
    {
    let seatElement = document.getElementById(Seatid);

    let checkValue = this.data.includes(SeatNumber)
    if(checkValue == true)
    {
    //identifies the seat and removes it
    let removeSeat = this.data.filter(function(value)
    {
        return value != SeatNumber

    })
    this.data = removeSeat;
    this.numberoftickets--;

    seatElement.style.border = "5px solid #ffffff";
    seatElement.style.background = "#ffffff";
    }
    else if(checkValue == false && SeatStatus != "Booked")
    {
      this.data.push(SeatNumber);
      this.numberoftickets++

      seatElement.style.border = "5px solid rgb(96, 143, 230)";
      seatElement.style.background = "rgb(96, 143, 230)";

    }
    console.log(this.data);
    this.allticketInformation.ticketDetalis.seatNumbers = this.data
    this.initilTickets(this.numberoftickets);
  }
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
       this.route.navigateByUrl('customer/Venue Selection/' + this.movieId); // put the url you want to navigate to
       this.counter = { min: 10, sec: 0  }
    }
    }, 1000)
  }

  cancel()
  {
    this.route.navigate(['customer/Venue Selection/' + this.movieId]);
  }

  async failToast() {
    const toast = await this.toastCtrl.create({
      message: 'Please select more seats',
      duration: 2000
    });
    toast.present();
  }

  initilTickets(ticket)
  {
    if(this.adulttickets < this.numberoftickets)
    {
      let e = this.adulttickets + 1;
      this.adulttickets = e;
      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;
      // to get it into a object
      this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
      this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
      this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }
    if(this.adulttickets > this.numberoftickets && this.adulttickets != 0)
    {

      let e = this.adulttickets - 1;
      this.adulttickets = e;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;

     // to get it into a object
     this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
     this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
     this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }
    if(this.childrenTickets != 0)
    {
      let e = this.childrenTickets - 1;
      this.childrenTickets = e;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;

        // to get it into a object
        this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
        this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
        this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }
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

        // to get it into a object
        this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
        this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
        this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }else if(this.adulttickets < this.numberoftickets)
    {
      let e = this.adulttickets + 1;
      this.adulttickets = e;

       // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;

       // to get it into a object
       this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
       this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
       this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
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

       // to get it into a object
       this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
       this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
       this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }else if(this.adulttickets < this.numberoftickets && this.childrenTickets == 0 || this.childrenTickets < this.numberoftickets)
    {
      let e = this.adulttickets - 1;
      this.adulttickets = e;

       // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;

       // to get it into a object
       this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
       this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
       this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }
    else{
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

       // to get it into a object
       this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
       this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
       this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }else if(this.childrenTickets< this.numberoftickets)
    {
      let e = this.childrenTickets + 1;
      this.childrenTickets = e;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;

       // to get it into a object
       this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
       this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
       this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
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

       // to get it into a object
       this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
       this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
       this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }else if(this.childrenTickets < this.numberoftickets && this.adulttickets == 0 || this.adulttickets < this.numberoftickets)
    {
      let e = this.childrenTickets- 1;
      this.childrenTickets = e;

      // this is to calculate the total ammount of the tickets
      let Acal = this.adulttickets * this.Aprice;
      let Ccal = this.childrenTickets * this.Cprice;
      this.totalammount = Acal + Ccal;

       // to get it into a object
       this.allticketInformation.ticketDetalis.adultTickets = this.adulttickets
       this.allticketInformation.ticketDetalis.childrenTickets = this.childrenTickets
       this.allticketInformation.ticketDetalis.totalAmount = this.totalammount
    }
    else
    {
     this.failToast();
    }
  }

  continue()
  {
    console.log(this.allticketInformation);
  }
}
