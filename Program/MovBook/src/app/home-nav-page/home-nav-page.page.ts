import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Movie } from '../models/account/customers';
import { CustomerService } from '../services/account/customer.service';
import { ContactUsComponentComponent } from './contact-us-component/contact-us-component.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

@Component({
  selector: 'app-home-nav-page',
  templateUrl: './home-nav-page.page.html',
  styleUrls: ['./home-nav-page.page.scss'],
})
export class HomeNavPagePage implements OnInit {

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
     spaceBetween: 5,
     slidesPerView: 4
    }

    async openmodalCustomer()
    {
    const modal = await this.modalCtrl.create({
      component: ContactUsComponentComponent,
      cssClass: 'customer-contact-us-css'
    });
    await modal.present();
    }

    async openmodalterms()
    {
    const modal = await this.modalCtrl.create({
      component: TermsAndConditionsComponent,
      cssClass: 'customer-terms-and-condition-css'
    });
    await modal.present();
    }

    aboutusNav()
    {
        this.router.navigate(['/about us']);
    }

    homeNav()
  {
      this.router.navigate(['/home']);
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
  
}
