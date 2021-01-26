import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: "root",
})
export class OperatorService {
  
  constructor(public http: HttpClient) {
  }

  getMovies() {
    console.log('T2')
    console.log(this.http.get("http://localhost:3000/api/movies"))
    return this.http.get("http://localhost:3000/api/movies");
  }
}
