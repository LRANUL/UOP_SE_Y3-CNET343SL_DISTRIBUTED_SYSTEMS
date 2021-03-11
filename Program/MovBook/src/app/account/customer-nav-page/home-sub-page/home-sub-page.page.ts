import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-home-sub-page',
  templateUrl: './home-sub-page.page.html',
  styleUrls: ['./home-sub-page.page.scss'],
})
export class HomeSubPagePage implements OnInit {

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getmovie();
  }

  showingmovies;

  sliderConfig =
  {
   spaceBetween: 7,
   centeredSlides: true,
   slidesPerView: 3
  }

  getmovie()
  {
   this.customerService.getShowingMovies();
   this.customerService.getmovies().subscribe((val)=>{
    this.showingmovies = val;
    console.log(this.showingmovies);
   })
  }

  showDetails(id)
  {
    console.log(id);
    this.router.navigate(['customer/movie details/',id]);
  }
}
