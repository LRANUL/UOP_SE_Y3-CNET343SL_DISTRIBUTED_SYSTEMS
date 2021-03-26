import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { movie } from "src/app/models/account/customers";
import { CinemaHall } from "src/app/models/account/cinema-hall";
import { CinemaLocation } from "src/app/models/account/cinema-location";
import { CustomerService } from "src/app/services/account/customer.service";
import { Movie } from "src/app/models/account/movie";

@Component({
  selector: "app-location-and-time-sub-page",
  templateUrl: "./location-and-time-sub-page.page.html",
  styleUrls: ["./location-and-time-sub-page.page.scss"],
})
export class LocationAndTimeSubPagePage implements OnInit {
  pipe = new DatePipe("en-US");
  constructor(
    private route: Router,
    private activatedroute: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  todayDate;
  location;
  date;
  startDate;
  endDate;
  experience;
  movieid;
  locationID;
  hallID;
  movies;
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
  movielocation;

  cinemaLocationList = [];

  moviehall;

  temoryID = "603b41f8a6bfd730f4abe8b3";

  ngOnInit() {
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, "mediumDate");
    this.todayDate = myFormattedDate;

    this.getListOfLocations();
    this.getshowingmoviedetails(this.temoryID);
    this.getMovieAdditionalDetails();
  }

  //get the id through the url and then acess it here (remove coment once id is passed)
  // ionViewWillEnter() {
  // let id = this.activatedroute.snapshot.paramMap.get('id');
  //this.movieid = id;
  //}

  getmoviedetails(id)
  {
   this.customerService.getmoviedetails(id);
  }

  getMovieAdditionalDetails()
  {
    this.customerService.getMovieDetail(this.temoryID);
    this.customerService.getmovies().subscribe((movie: Movie)=> {
      this.movieDetails = movie;
      console.log( this.movieDetails);
    })
  }

  getshowingmoviedetails(id) {
    this.customerService.getshowingmoviedetails(id);
    this.customerService.getmovie().subscribe((moviedetail: movie) => {
      this.movies = moviedetail; // this is the way it should be done to get multiple locations
      console.log(this.movies);
      this.startDate =  moviedetail[0].showingStartDate;
      this.endDate = moviedetail[0].showingEndDate;
    });
  }

  getListOfLocations()
  {
    this.customerService.retrieveAllCinemaLocations().subscribe((val)=>
    {
      this.cinemaLocationList = val as CinemaLocation[];
    });
  }

  gotourl() {
    this.route.navigateByUrl("customer/booking");
  }

  getlocation() {
    console.log(this.location)
    if(this.location == "All")
    {
      this.getshowingmoviedetails(this.temoryID);
    }else
    {
    this.customerService.getSelectedShowingMovieDetails(this.location);
    this.customerService.getmovie().subscribe((movies: movie) => {
      let id = movies[0].movieObjectId;
      console.log(id);
      if(id == this.temoryID)
      {
        this.movies = movies;
      } else
      {
       this.movies = "";
      }
      //this.moviedetails.movieLocation = movie.returnedData.cinemaLocationName; // no need this just in case
     })
    }
  }

  getTime() {
    let updateddate = this.pipe.transform(this.date, "mediumDate");
    console.log(updateddate);
  }

  getexperience() {
    console.log(this.experience);
    if(this.experience == "All")
    {
      this.getshowingmoviedetails(this.temoryID);
    }else
    {
      this.customerService.getmovieexperience(this.experience);
      this.customerService.getmovie().subscribe((movies: movie) => {
      let id = movies[0].movieObjectId;
      console.log(id);
      if(id == this.temoryID)
      {
        this.movies = movies;
      } else
      {
       this.movies = "";
      }
      //this.moviedetails.movieLocation = movie.returnedData.cinemaLocationName; // no need this just in case
     })
    }
  }
}
