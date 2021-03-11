import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-home-sub-page',
  templateUrl: './home-sub-page.page.html',
  styleUrls: ['./home-sub-page.page.scss'],
})
export class HomeSubPagePage implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getmovie();
  }

  showingmovies;

  sliderConfig =
  {
   spaceBetween: 10,
   centeredSlides: true,
   slidesPerView: 1.6
  }

  getmovie()
  {
   this.customerService.getShowingMovies();
   this.customerService.getmovies().subscribe((val)=>{
    this.showingmovies = val;
    console.log(this.showingmovies);
   })
  }
}
