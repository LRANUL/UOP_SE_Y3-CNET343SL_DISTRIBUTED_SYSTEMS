import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { movie } from 'src/app/models/account/customers';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-location-and-time-sub-page',
  templateUrl: './location-and-time-sub-page.page.html',
  styleUrls: ['./location-and-time-sub-page.page.scss'],
})
export class LocationAndTimeSubPagePage implements OnInit {


  pipe = new DatePipe('en-US'); 
  constructor(private route: Router, private activatedroute : ActivatedRoute, private customerService: CustomerService) { }

  showingMovies: movie = {
    movieObjectId: '',
    cinemaHallObjectId: '',
    cinemalocationObjectId: '',
    showingExperience: '',
    showingStartDate: '',
    showingEndDate: '',
    showingTime: ''
  };

  todayDate;
  location;
  date;
  experience;
  movieid;
  locationID;
  temoryID = "2";

  ngOnInit() {
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'mediumDate');
    this.todayDate= myFormattedDate;

    this.getmoviedetails(this.temoryID);
  }

  //get the id through the url and then acess it here (remove coment once id is passed)
 // ionViewWillEnter() {
   // let id = this.activatedroute.snapshot.paramMap.get('id');
    //this.movieid = id;
  //}

  
  getmoviedetails(id) 
  {
    this.customerService.getmoviedetails(id);
    this.customerService.getmovie().subscribe((moviedetails:movie) => {
      this.showingMovies = moviedetails;
      this.locationID = moviedetails.cinemalocationObjectId;
      console.log(this.showingMovies) 
      console.log(this.locationID);
    });
}

  gotourl()
  {
   this.route.navigateByUrl('customer/booking');
  }

  getlocation()
  {
  console.log(this.location)
  }

  getTime()
  {
   let updateddate = this.pipe.transform(this.date,'mediumDate');
   console.log(updateddate);
  }

  getexperience()
  {
   console.log(this.experience)
  }

}
