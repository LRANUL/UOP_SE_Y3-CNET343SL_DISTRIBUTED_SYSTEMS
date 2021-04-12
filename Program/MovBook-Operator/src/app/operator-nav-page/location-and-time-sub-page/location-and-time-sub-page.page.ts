import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { locationDetails, movie, sessionDetails } from "src/app/models/account/operators";
import { CinemaLocation } from "src/app/models/account/cinema-location";
import { OperatorService } from "./../../service/operator.service";
import { CinemaExperience, Movie } from "src/app/models/account/movie";
import { ModalController, NavController, NavParams } from "@ionic/angular";
import { BookingSubPagePage } from "../booking-sub-page/booking-sub-page.page";
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: "app-location-and-time-sub-page",
  templateUrl: "./location-and-time-sub-page.page.html",
  styleUrls: ["./location-and-time-sub-page.page.scss"],
})
export class LocationAndTimeSubPagePage implements OnInit {
  pipe = new DatePipe("en-US");
  allticketInformation: any;
  constructor(
    private route: Router,
    private activatedroute: ActivatedRoute,
    private operatorService: OperatorService,
    private params: NavParams,
    private modelCtrl: ModalController,
    private navCtrl: NavController
  ) { }

  location;
  date;
  startDate;
  endDate;
  experience;
  movieid;
  locationID;
  hallID;
  movies: movie;
  mov = new Array();
  movieDetails: Movie = {
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
  }
  movielocation;

  cinemaLocationList: CinemaLocation;
  cinemaExperienceList: CinemaExperience;

  movieLocation: locationDetails = {
    cinemaLocationObjectId: '',
    cinemaLocationName: '',
    cinemaLocationAddress: {
      streetAddress: '',
      city: '',
      postalCode: ''
    }
  };

  movieLocationArray = new Array();

  movieSession: sessionDetails = {
    slotObjectId: '',
    showingDate: '',
    showingExperience: '',
    timeSlotStartTime: '',
    timeSlotEndTime: '',
    adultsTicketFeeLKR: '',
    childrenTicketFeeLKR: ''
  }

  movieSessionArray = new Array();

  movieExperienceSessionArray = new Array();

  moviehall;

  routedID;
  @Input() id: string;
  ngOnInit() {
    this.routedID = this.id;
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, "mediumDate");
    this.date = myFormattedDate;

    this.getListOfLocations();
    this.getListOfExperience();
    this.getshowingmoviedetails(this.routedID);
    this.getMovieAdditionalDetails();
  }

  // get the id through the url and then acess it here (remove coment once id is passed)
  ionViewWillEnter() {
    let id = this.id
    this.movieid = id;
  }
  async openSeatSelector(id, timeSlotStartTime) {
    var allticketInformation
    let navigationExtras: NavigationExtras = {
      state: {
        Time: timeSlotStartTime
      }
    };
    const BookingPage = this.modelCtrl.create({
      component: BookingSubPagePage,
      componentProps: {
        'id': id,
        'Time': navigationExtras,
      }
    });
    (await BookingPage).onDidDismiss().then(async (bookingData) => {
      if (bookingData == null) {
        this.modelCtrl.dismiss()
      }
      else if (bookingData.role == "backdrop") {
        this.modelCtrl.dismiss()
      }
      else if (bookingData !== null) {
        allticketInformation = bookingData.data;
        this.sendTicketDetails(allticketInformation)
      }
    });
    return await (await BookingPage).present();
  }

  sendTicketDetails(allticketInformation) {
    this.operatorService.allticketInformation.next(allticketInformation);
  }
  getmoviedetails(id) {
    this.operatorService.getmoviedetails(id);
  }

  getMovieAdditionalDetails() {
    this.operatorService.getMovieDetail(this.routedID);
    this.operatorService.getmovies().subscribe((movie: Movie) => {
      this.movieDetails = movie;
      console.log(this.movieDetails);
    })
  }

  getshowingmoviedetails(id) {
    this.operatorService.getshowingmoviedetails(id);
    this.operatorService.getmovie().subscribe((moviedetail: movie) => {
      this.movies = moviedetail; // this is the way it should be done to get multiple locations
      console.log(moviedetail)
      let value = Object.keys(moviedetail)
      let length = value.length;
      let counter = 0;
      // to get all the values of the location
      let value1 = Object.keys(moviedetail[counter].showingSlots)
      let length1 = value1.length;
      console.log(length1);
      let counter1 = 0;
      this.movieSessionArray = [];
      this.movieLocationArray = [];
      for (counter; counter < length; counter++) {
        this.movieLocation = {
          cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
          cinemaLocationName: moviedetail[counter].cinemaLocation.cinemaLocationName,
          cinemaLocationAddress: {
            streetAddress: moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
            city: moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
            postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
          }
        };
        this.movieLocationArray.push(this.movieLocation);
        console.log(this.movieLocationArray)
        for (counter1; counter1 < length1; counter1++) {
          let showingDate = moviedetail[counter].showingSlots[counter1].showingDate;
          if (showingDate == this.date) {
            this.movieSession = {
              slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
              showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
              showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
              timeSlotStartTime: moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
              timeSlotEndTime: moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
              adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
              childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
            }
            this.movieSessionArray.push(this.movieSession);
            console.log(this.movieSessionArray)
          }
        }
      }
    });
  }

  getListOfLocations() {
    this.operatorService.retrieveAllCinemaLocations();
    this.operatorService.getlocation().subscribe((val: CinemaLocation) => {
      console.log(val);
      this.cinemaLocationList = val;
    });
  }

  getListOfExperience() {
    this.operatorService.retrieveAllExperience();
    this.operatorService.getExperience().subscribe((val: CinemaExperience) => {
      console.log(val);
      this.cinemaExperienceList = val;
    });
  }

  showingTime;
  covertTimeToArray(time) {
    this.showingTime = time.split(" ")
    return this.showingTime
  }


  getlocation() {
    if (this.location == "All") {
      this.getshowingmoviedetails(this.routedID);
    } else {
      this.operatorService.getshowingmoviedetails(this.routedID);
      this.operatorService.getmovie().subscribe((moviedetail: movie) => {
        this.movies = moviedetail; // this is the way it should be done to get multiple locations
        console.log(this.movies)
        let value = Object.keys(moviedetail)
        let length = value.length;
        let counter = 0;
        // to get all the values of the location
        let value1 = Object.keys(moviedetail[counter].showingSlots)
        let length1 = value1.length;
        let counter1 = 0;
        this.movieSessionArray = [];
        this.movieLocationArray = [];
        for (counter; counter < length; counter++) {
          let location = moviedetail[counter].cinemaLocation.cinemaLocationName;
          let showingDate = moviedetail[counter].showingSlots[counter1].showingDate
          if (location == this.location && showingDate == this.date) {
            this.movieLocation = {
              cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
              cinemaLocationName: moviedetail[counter].cinemaLocation.cinemaLocationName,
              cinemaLocationAddress: {
                streetAddress: moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
                city: moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
                postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
              }
            };
            this.movieLocationArray.push(this.movieLocation);
            for (counter1; counter1 < length1; counter1++) {
              console.log(location);
              this.movieSession = {
                slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
                showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
                showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
                timeSlotStartTime: moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
                timeSlotEndTime: moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
                adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
                childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
              }
              console.log(this.movieSession)
              this.movieSessionArray.push(this.movieSession);
            }
            console.log(this.movieSessionArray);
          }
        }
      })
    }
  }

  getTime() {
    let updateddate = this.pipe.transform(this.date, "mediumDate");
    this.operatorService.getshowingmoviedetails(this.routedID);
    this.operatorService.getmovie().subscribe((moviedetail: movie) => {
      this.movies = moviedetail; // this is the way it should be done to get multiple locations
      console.log(moviedetail)
      let value = Object.keys(moviedetail)
      let length = value.length;
      let counter = 0;
      // to get all the values of the location
      let value1 = Object.keys(moviedetail[counter].showingSlots)
      let length1 = value1.length;
      console.log(length1);
      let counter1 = 0;
      this.movieSessionArray = [];
      this.movieLocationArray = [];
      for (counter; counter < length; counter++) {
        this.movieLocation = {
          cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
          cinemaLocationName: moviedetail[counter].cinemaLocation.cinemaLocationName,
          cinemaLocationAddress: {
            streetAddress: moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
            city: moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
            postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
          }
        };
        console.log(this.movieLocation);
        this.movieLocationArray.push(this.movieLocation);

        for (counter1; counter1 < length1; counter1++) {
          let showingDate = moviedetail[counter].showingSlots[counter1].showingDate;
          if (showingDate == updateddate) {
            this.movieSession = {
              slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
              showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
              showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
              timeSlotStartTime: moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
              timeSlotEndTime: moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
              adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
              childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
            }
            console.log(this.movieSession);
            this.movieSessionArray.push(this.movieSession);
            console.log(this.movieSessionArray);
          }
        }
      }
    });
  }

  getExperience() {
    if (this.experience == "All") {
      this.getshowingmoviedetails(this.routedID);
    } else {
      this.operatorService.getshowingmoviedetails(this.routedID);
      this.operatorService.getmovie().subscribe((moviedetail: movie) => {
        this.movies = moviedetail; // this is the way it should be done to get multiple locations
        let value = Object.keys(moviedetail)
        let length = value.length;
        let counter = 0;
        // to get all the values of the location
        let value1 = Object.keys(moviedetail[counter].showingSlots)
        let length1 = value1.length;
        let counter1 = 0;
        this.movieSessionArray = [];
        this.movieLocationArray = [];
        for (counter; counter < length; counter++) {
          this.movieLocation = {
            cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
            cinemaLocationName: moviedetail[counter].cinemaLocation.cinemaLocationName,
            cinemaLocationAddress: {
              streetAddress: moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
              city: moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
              postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
            }
          };
          this.movieLocationArray.push(this.movieLocation);
          for (counter1; counter1 < length1; counter1++) {
            let experience = moviedetail[counter].showingSlots[counter1].showingExperience;
            let showingDate = moviedetail[counter].showingSlots[counter1].showingDate;
            if (experience == this.experience && showingDate == this.date) {
              console.log(experience);
              this.movieSession = {
                slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
                showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
                showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
                timeSlotStartTime: moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
                timeSlotEndTime: moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
                adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
                childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
              }
              console.log(this.movieSession)
              this.movieSessionArray.push(this.movieSession);
            }
          }
          console.log(this.movieSessionArray);
        }
      })
    }
  }
}
