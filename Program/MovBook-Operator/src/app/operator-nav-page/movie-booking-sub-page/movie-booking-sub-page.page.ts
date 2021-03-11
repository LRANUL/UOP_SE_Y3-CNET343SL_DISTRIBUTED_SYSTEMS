import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { OperatorService } from "./../../service/operator.service";



@Component({
  selector: "app-movie-booking-sub-page",
  templateUrl: "./movie-booking-sub-page.page.html",
  styleUrls: ["./movie-booking-sub-page.page.scss"],
})
export class MovieBookingSubPagePage implements OnInit {
  Movies: Object;
  Beverages: Object;
  constructor(private menu: MenuController,
    public operatorService: OperatorService) {}

  ngOnInit() {
    this.operatorService.getMovies().subscribe(
      (data) => {
        this.Movies = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.operatorService.getBeverages().subscribe(
      (data) => {
        this.Beverages = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  book(movie) {
    console.log(movie.title);
    this.operatorService.getMovie(movie.title).subscribe(
      (data) => {
        this.Movies = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  beverages(beverage) {
    console.log(beverage.title);

  }
}
