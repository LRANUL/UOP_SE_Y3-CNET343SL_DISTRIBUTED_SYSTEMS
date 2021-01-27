import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: "root",
})
export class OperatorService {
  
  constructor(public http: HttpClient) {
  }

  getMovies() {
    return this.http.get("https://movbook-app.herokuapp.com/api/movies");
  }
}
