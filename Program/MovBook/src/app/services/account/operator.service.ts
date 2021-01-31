import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: "root",
})
export class OperatorService {
  
  constructor(public http: HttpClient) {
  }

  getMovies() {
    return this.http.get("http://localhost:5000/api/movies");

    // return this.http.get("https://movbook-app.herokuapp.com/api/movies");
    
  }

  getBeverages(){
    return this.http.get("http://localhost:5000/api/beverages");
  }
  getProfile(email){
    return this.http.get("http://localhost:5000/api/users?email="+ email);
    // return this.http.get("https://movbook-app.herokuapp.com/api/users?email="+ email);

  }

  getMovie(movieTitle){
    return this.http.get("http://localhost:5000/api/movie?title="+ movieTitle);
    // return this.http.get("https://movbook-app.herokuapp.com/api/movie?title="+ movieTitle);

  }
}
