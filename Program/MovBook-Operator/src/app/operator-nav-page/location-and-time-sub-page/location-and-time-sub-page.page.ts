import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { locationDetails, movie, sessionDetails} from "src/app/models/operators";
import {CinemaLocation } from "src/app/models/cinema-location";
import { OperatorService } from "src/app/service/operator.service";
import { CinemaExperience, Movie } from "src/app/models/movie";
import { ModalController, NavController } from "@ionic/angular";
import { BookingSubPagePage } from "../booking-sub-page/booking-sub-page.page";

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
    private modelCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  location;
  date;
  startDate;
  endDate;
  experience;
  movieid;
  locationID;
  hallID;
  movies : movie;
  mov = new Array();
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
}
  movielocation;

  cinemaLocationList : CinemaLocation;
  cinemaExperienceList : CinemaExperience;

  movieLocation: locationDetails = {
    cinemaLocationObjectId: '',
    cinemaLocationName : '',
    cinemaLocationAddress : {
      streetAddress : '',
      city : '',
      postalCode: ''
    }
  };

  movieLocationArray = new Array();

  movieSession: sessionDetails = {
    slotObjectId: '',
    showingDate: '',
    showingExperience: '',
    timeSlotStartTime: '',
    timeSlotEndTime:'',
    adultsTicketFeeLKR: '',
    childrenTicketFeeLKR: ''
  }

  movie2DArray = new Array();
  movie3DArray = new Array();
  movieDolbyArray = new Array();

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

  async openSeatSelector(id, timeSlotStartTime, timeSlotEndTime) {
    var allticketInformation
    let navigationExtras: NavigationExtras = {
      state: {
        Time: timeSlotStartTime +" - "+ timeSlotEndTime
      }
    };
    console.log(navigationExtras+"timeslot")
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
  //get the id through the url and then acess it here (remove coment once id is passed)
  // ionViewWillEnter() {
  // let id = this.activatedroute.snapshot.paramMap.get('id');
  //this.movieid = id;
  //}

  getmoviedetails(id)
  {
   this.operatorService.getMovieDetail(id);
  }

  getMovieAdditionalDetails()
  {
    this.operatorService.getMovieDetail(this.routedID);
    this.operatorService.getmovies().subscribe((movie: Movie)=> {
      this.movieDetails = movie;
    })
  }

  showingExperience;
  experienceCheck2D = false;
  experienceCheck3D = false;
  experienceCheckDolby = false;
  experienceCheckOther = false;
  getshowingmoviedetails(id) {
    this.experienceCheck2D = false;
    this.experienceCheck3D = false;
    this.experienceCheckDolby = false;
    this.experienceCheckOther = false;
    this.operatorService.getshowingmoviedetails(id);
    this.operatorService.getmovie().subscribe((moviedetail: movie) => {
      this.movies = moviedetail; // this is the way it should be done to get multiple locations
      console.log(moviedetail);
      console.log(moviedetail)
      let value = Object.keys(moviedetail)
      console.log(value)
      let length = value.length;
      let counter = 0;
      // to get all the values of the location
      let value1 = Object.keys(moviedetail[counter].showingSlots)
      let length1 = value1.length;
      let counter1 = 0;
      this.movie2DArray = [];
      this.movie3DArray = [];
      this.movieDolbyArray = [];
      this.movieLocationArray = [];
      for(counter; counter < length; counter++)
      {
        this.movieLocation = {
          cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
          cinemaLocationName : moviedetail[counter].cinemaLocation.cinemaLocationName,
          cinemaLocationAddress : {
            streetAddress : moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
            city : moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
            postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
          }
        };
        let checkValue = moviedetail[counter].cinemaLocation.cinemaLocationName;
        if(this.movieLocationArray.includes(checkValue))
        {
         console.log("value Exist");
         console.log(checkValue);
        }else {
          console.log(checkValue);
          this.movieLocationArray.push(this.movieLocation);
        }
        console.log(this.movieLocationArray)
       for(counter1; counter1 < length1; counter1++)
        {
          let showingDate = moviedetail[counter].showingSlots[counter1].showingDate;
          if(showingDate == this.date)
          {
           this.showingExperience = moviedetail[counter].showingSlots[counter1].showingExperience;
            if(this.showingExperience == "2D")
            {
          this.movieSession = {
            slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
            showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
            showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
            timeSlotStartTime:  moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
            timeSlotEndTime:  moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
            adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
            childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
          }
            this.movie2DArray.push(this.movieSession);
            this.experienceCheck2D = true
            }
           else if(this.showingExperience == "3D")
            {
          this.movieSession = {
            slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
            showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
            showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
            timeSlotStartTime:  moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
            timeSlotEndTime:  moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
            adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
            childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
          }
        this.movie3DArray.push(this.movieSession);
        this.experienceCheck3D = true
            }
            else if(this.showingExperience == "Dolby ATMOS")
            {
          this.movieSession = {
            slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
            showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
            showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
            timeSlotStartTime:  moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
            timeSlotEndTime:  moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
            adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
            childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
          }
        this.movieDolbyArray.push(this.movieSession);
        this.experienceCheckDolby = true
            }
        }
      }
    }
    });
  }

  getListOfLocations()
  {
    this.operatorService.retrieveAllCinemaLocations();
    this.operatorService.getlocation().subscribe((val: CinemaLocation)=>
    {
      console.log(val);
      this.cinemaLocationList = val;
    });
  }

  descriptionAtmos;
  description3D;
  description2D;
  getListOfExperience()
  {
    this.operatorService.retrieveAllExperience();
    this.operatorService. getExperience().subscribe((experienceList: CinemaExperience)=>
    {
      this.cinemaExperienceList = experienceList;
        let value = Object.keys(experienceList[0].description)
        let length = value.length;
        let counter = 0;
      for(counter; counter < length; counter++)
      {
      let experience = experienceList[counter].showingExperience
      if(experience== "Dolby ATMOS")
      {
         this.descriptionAtmos = experienceList[counter].description;
         console.log(this.descriptionAtmos);
      }else if(experience == "3D")
      {
        this.description3D = experienceList[counter].description;
        console.log(this.experienceCheck3D);
      }else
      {
        this.description2D = experienceList[counter].description;
      }
     }
    });
  }

  showingTime;
  covertTimeToArray(time)
  {
   this.showingTime =time.split(" ")
   return this.showingTime
  }


  getlocation() {
    console.log(this.location);
    if(this.location == "All")
    {
      this.getshowingmoviedetails(this.routedID);
    }else
    {
      this.experienceCheck2D = false;
      this.experienceCheck3D = false;
      this.experienceCheckDolby = false;
      this.experienceCheckOther = false;
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
        this.movie2DArray = [];
        this.movie3DArray = [];
        this.movieDolbyArray = [];
        this.movieLocationArray = [];
        for(counter; counter < length; counter++)
        {
        let location = moviedetail[counter].cinemaLocation.cinemaLocationName;
        console.log(location);
        console.log(this.date)
          if(location == this.location)
          {
        this.movieLocation = {
          cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
          cinemaLocationName : moviedetail[counter].cinemaLocation.cinemaLocationName,
          cinemaLocationAddress : {
            streetAddress : moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
            city : moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
            postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
          }
        };
        this.movieLocationArray.push(this.movieLocation);
         for(counter1; counter1 < length1; counter1++)
          {
            this.showingExperience = moviedetail[counter].showingSlots[counter1].showingExperience;
            let showingDate = moviedetail[counter].showingSlots[counter1].showingDate
            if(this.showingExperience == "2D" && showingDate == this.date)
            {
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
          this.experienceCheck2D = true
          this.movie2DArray.push(this.movieSession);
          } else if(this.showingExperience == "3D" && showingDate == this.date)
          {
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
        this.experienceCheck3D = true
        this.movie3DArray.push(this.movieSession);
        }else if(this.showingExperience == "Dolby ATMOS" && showingDate == this.date)
        {
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
      this.experienceCheckDolby = true
      this.movieDolbyArray.push(this.movieSession);
      }
       }
      }
    }
    })
   }
  }

  getTime() {
    this.experienceCheck2D = false;
    this.experienceCheck3D = false;
    this.experienceCheckDolby = false;
    this.experienceCheckOther = false;
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
      this.movie2DArray = [];
      this.movie3DArray = [];
      this.movieDolbyArray = [];
      this.movieLocationArray = [];
      for(counter; counter < length; counter++)
      {
        this.movieLocation = {
          cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
          cinemaLocationName : moviedetail[counter].cinemaLocation.cinemaLocationName,
          cinemaLocationAddress : {
            streetAddress : moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
            city : moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
            postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
          }
        };
        console.log(this.movieLocation);
        this.movieLocationArray.push(this.movieLocation);

       for(counter1; counter1 < length1; counter1++)
        {
          let showingDate = moviedetail[counter].showingSlots[counter1].showingDate;
          if(showingDate == updateddate)
          {
            this.showingExperience = moviedetail[counter].showingSlots[counter1].showingExperience;
            if(this.showingExperience == "2D")
            {
          this.movieSession = {
            slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
            showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
            showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
            timeSlotStartTime:  moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
            timeSlotEndTime:  moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
            adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
            childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
          }
          console.log(this.movieSession);
          this.experienceCheck2D = true
          this.movie2DArray.push(this.movieSession);
            } if(this.showingExperience == "3D")
            {
          this.movieSession = {
            slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
            showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
            showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
            timeSlotStartTime:  moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
            timeSlotEndTime:  moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
            adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
            childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
          }
          console.log(this.movieSession);
          this.experienceCheck3D = true
          this.movie3DArray.push(this.movieSession);
            } if(this.showingExperience == "Dolby ATMOS")
            {
          this.movieSession = {
            slotObjectId: moviedetail[counter].showingSlots[counter1]._id,
            showingDate: moviedetail[counter].showingSlots[counter1].showingDate,
            showingExperience: moviedetail[counter].showingSlots[counter1].showingExperience,
            timeSlotStartTime:  moviedetail[counter].showingSlots[counter1].timeSlotStartTime,
            timeSlotEndTime:  moviedetail[counter].showingSlots[counter1].timeSlotEndTime,
            adultsTicketFeeLKR: moviedetail[counter].showingSlots[counter1].adultsTicketFeeLKR,
            childrenTicketFeeLKR: moviedetail[counter].showingSlots[counter1].childrenTicketFeeLKR
          }
          console.log(this.movieSession);
          this.experienceCheckDolby = true
          this.movieDolbyArray.push(this.movieSession);
            }
        }
      }
    }
    });
  }

  getExperience() {
    if(this.experience == "All")
    {
      this.getshowingmoviedetails(this.routedID);
    }else
    {
      this.experienceCheck2D = false;
      this.experienceCheck3D = false;
      this.experienceCheckDolby = false;
      this.experienceCheckOther = false;
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
        this.movie2DArray = [];
        this.movie3DArray = [];
        this.movieDolbyArray = [];
        this.movieLocationArray = [];
        for(counter; counter < length; counter++)
        {
        this.movieLocation = {
          cinemaLocationObjectId: moviedetail[counter].cinemaLocation.cinemaLocationObjectId,
          cinemaLocationName : moviedetail[counter].cinemaLocation.cinemaLocationName,
          cinemaLocationAddress : {
            streetAddress : moviedetail[counter].cinemaLocation.cinemaLocationAddress.streetAddress,
            city : moviedetail[counter].cinemaLocation.cinemaLocationAddress.city,
            postalCode: moviedetail[counter].cinemaLocation.cinemaLocationAddress.postalCode
          }
        };
        this.movieLocationArray.push(this.movieLocation);
         for(counter1; counter1 < length1; counter1++)
          {
         let experience = moviedetail[counter].showingSlots[counter1].showingExperience;
         let showingDate =  moviedetail[counter].showingSlots[counter1].showingDate;
         if(experience == this.experience && showingDate == this.date)
         {
          this.showingExperience = moviedetail[counter].showingSlots[counter1].showingExperience;
          if(this.showingExperience == "2D")
          {
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
          this.experienceCheck2D = true
          this.experienceCheck3D = false
         this.experienceCheckDolby = false
          this.movie2DArray.push(this.movieSession);
         }if(this.showingExperience == "3D")
         {
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
         this.experienceCheck3D = true
         this.experienceCheck2D = false
         this.experienceCheckDolby = false
         this.movie3DArray.push(this.movieSession);
        }if(this.showingExperience == "Dolby ATMOS")
        {
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
        this.experienceCheckDolby = true
        this.experienceCheck3D = false
         this.experienceCheck2D = false
        this.movieDolbyArray.push(this.movieSession);
        }
         }
       }
      }
    })
   }
 }
}
