import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { movie } from "src/app/models/account/customers";
import { CinemaHall } from "src/app/models/account/manager/cinema-hall";
import { CinemaLocation } from "src/app/models/account/manager/cinema-location";
import { CustomerService } from "src/app/services/account/customer.service";
import { ManagerService } from "src/app/services/account/manager.service";

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
  movielocation;

  moviehall; 

  temoryID = "2";

  ngOnInit() {
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, "mediumDate");
    this.todayDate = myFormattedDate;

    this.getshowingmoviedetails(this.temoryID);
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

  getshowingmoviedetails(id) {
    this.customerService.getshowingmoviedetails(id);
    this.customerService.getmovie().subscribe((moviedetail: movie) => {
      this.movies = moviedetail; // this is the way it should be done to get multiple locations
      this.hallID = moviedetail[0].cinemaHallObjectId;
      this.locationID = moviedetail[0].cinemaLocationObjectId;
      this.startDate =  moviedetail[0].showingStartDate;
      this.endDate = moviedetail[0].showingEndDate;
    //  this.moviedetails.cinemaExperience = moviedetail[0].showingExperience; // this should come in the hall databse
      console.log(this.endDate);
      console.log(this.hallID);
      this.getmoviehall(this.hallID);
      this.getmovielocation(this.locationID);
    });
  }

  getmoviehall(id)
  {
  this.customerService.retrieveCinemaHall(id);
  this.customerService.gethall().subscribe((movie: CinemaHall) => {
    this.moviehall = movie;
    console.log(movie);
  });
  }

  getmovielocation(id)
  {
   this.customerService.retrieveCinemaLocation(id);
    this.customerService.getlocation().subscribe((movie: CinemaLocation) => {
    this.movielocation = movie;
    console.log(this.movielocation);
    //this.moviedetails.movieLocation = movie.returnedData.cinemaLocationName; // no need this just in case
    console.log(movie);
   })
  }

  gotourl() {
    this.route.navigateByUrl("customer/booking");
  }

  getlocation() {
    console.log(this.location)
    this.customerService.getmovielocation(this.location);
    this.customerService.getlocation().subscribe((movie: any) => {
      if(movie == [])
      {
        this.movielocation = "";
        console.log(this.movielocation);
      }
        this.movielocation = movie; 
      //this.moviedetails.movieLocation = movie.returnedData.cinemaLocationName; // no need this just in case
      console.log(movie);
     })
  }

  getTime() {
    let updateddate = this.pipe.transform(this.date, "mediumDate");
    console.log(updateddate);
  }

  getexperience() {
    console.log(this.experience);
  }
}
