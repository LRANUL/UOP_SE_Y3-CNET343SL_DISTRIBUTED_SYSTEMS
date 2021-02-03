import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieSearchResult } from 'src/app/models/account/manager';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private BASE_URL = environment.MOVBOOK_BACKEND_URL;

  constructor(
    private httpClient: HttpClient
  ) { }

  // Retrieve movie search results from the backend according to the entered movie title and (optional) movie release year
  getMovieSearchResults(movieTitle: string, movieReleaseYear: string): Observable<MovieSearchResult> {
    if(movieReleaseYear == ""){
      return this.httpClient.get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/" + movieTitle);
    }
    else if(movieReleaseYear != ""){
      return this.httpClient.get<MovieSearchResult>(this.BASE_URL + "api/omdb/upcoming-movies/" + movieTitle + "/" + movieReleaseYear);
    }
  }
}
