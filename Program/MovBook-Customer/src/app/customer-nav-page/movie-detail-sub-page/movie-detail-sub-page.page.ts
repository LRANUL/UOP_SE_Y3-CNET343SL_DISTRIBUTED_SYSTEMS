import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/account/movie';
import { CustomerService } from 'src/app/services/account/customer.service';

@Component({
  selector: 'app-movie-detail-sub-page',
  templateUrl: './movie-detail-sub-page.page.html',
  styleUrls: ['./movie-detail-sub-page.page.scss'],
})
export class MovieDetailSubPagePage implements OnInit {

  constructor(private customerService: CustomerService, private activatedroute: ActivatedRoute) { }

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
        Value: ''
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
    response: ''
  };


  getmovie()
  {
   this.movieId;
   this.customerService.getMovieDetail(this.movieId);
   this.customerService.getmovies().subscribe((val: Movie)=>{
     this.movieDetails = val
     console.log(this.movieDetails);
   })
  }
}
