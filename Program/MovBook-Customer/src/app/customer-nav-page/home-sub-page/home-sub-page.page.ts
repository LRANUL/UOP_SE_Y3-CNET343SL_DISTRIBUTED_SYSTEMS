import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/models/account/movie';
import { CustomerService } from 'src/app/services/account/customer.service';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'app-home-sub-page',
  templateUrl: './home-sub-page.page.html',
  styleUrls: ['./home-sub-page.page.scss'],
})
export class HomeSubPagePage implements OnInit {

  constructor(private customerService: CustomerService, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getmovie();
  }

   nowShowingMovies = new Array();
   nowShowing;
   upcomingShowingMovies = new Array();
   upcoming;
   movieDetails;
   waitListedMovies = new Array();
   waitlisted;

  sliderConfig =
  {
   spaceBetween: 10,
   centeredSlides: true,
   slidesPerView: 1.6
  }

  getmovie()
  {
   this.customerService.getShowingMovies();
   this.customerService.getmovies().subscribe((movieDetails: Movie)=>{
     let value = Object.keys(movieDetails)
     let length = value.length;
     let counter = 0;
     for(counter; counter < length; counter++)
     {
     let status = movieDetails[counter].movieStatus
     if(status == "NowShowing" && status != "Upcoming")
      {
      this.nowShowing = movieDetails[counter];
      this.nowShowingMovies.push(this.nowShowing);
      console.log(this.nowShowing);
      }else if(status == "Upcoming")
      {
       this.upcoming = movieDetails[counter];
       this.upcomingShowingMovies.push(this.upcoming);
      }
      else
      {
       this.waitlisted = movieDetails[counter];
       this.waitListedMovies.push(this.waitlisted);
      }
     }
   })
  }

  showDetails(id)
  {
    console.log(id);
    this.router.navigate(['customer/movie details/',id]);
  }

  venuSelection(id)
  {
    console.log(id);
    this.router.navigate(['customer/Venue Selection/',id]);
  }
}
