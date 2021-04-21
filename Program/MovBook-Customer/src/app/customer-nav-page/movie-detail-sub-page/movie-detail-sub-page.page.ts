import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/account/movie';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-movie-detail-sub-page',
  templateUrl: './movie-detail-sub-page.page.html',
  styleUrls: ['./movie-detail-sub-page.page.scss'],
})
export class MovieDetailSubPagePage implements OnInit {

  constructor(private customerService: CustomerService, private activatedroute: ActivatedRoute, private router: Router) { }

  movieId;

  //603b41f8a6bfd730f4abe8b3

  ngOnInit() {
  }

  ionViewWillEnter() {
  let id = this.activatedroute.snapshot.paramMap.get('id');
  this.movieId = id;
  console.log(this.movieId);
  this.getmovie();
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

  showingCheck;
  getmovie()
  {
   this.movieId;
   this.customerService.getMovieDetail(this.movieId);
   this.customerService.getmovies().subscribe((val: Movie)=>{
     this.movieDetails = val
     let movieDetails = val.movieStatus
     if(movieDetails == "NowShowing")
     {
       this.showingCheck = true
     }else
     {
       this.showingCheck = false
     }
     console.log(this.movieDetails);
   })
  }

  venuSelection(id)
  {
    console.log(id);
    this.router.navigate(['customer/Venue Selection/',id]);
  }
}
