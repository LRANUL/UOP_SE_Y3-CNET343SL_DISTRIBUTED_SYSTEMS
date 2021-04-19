import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { OperatorService } from "./../../service/operator.service";
@Component({
  selector: "app-dashboard-sub-page",
  templateUrl: "./dashboard-sub-page.page.html",
  styleUrls: ["./dashboard-sub-page.page.scss"],
})
export class DashboardSubPagePage implements OnInit {
  Movies: Object;
  name: string;
  fname:string;
  lname: string;
  email: string;
  constructor(
    private menu: MenuController,
    public operatorService: OperatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fname = localStorage.getItem('name');
    this.lname = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    // Remove after getting login credentials
    this.name = this.fname+" "+this.lname;
    this.operatorService.getMovies().subscribe(
      (data) => {
        this.Movies = data['returnedData'];
        console.log(data['returnedData']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
/** Navigation */
  goToDashboard() {
    this.router.navigate(['operator']);
  }
  goToBooking() {
    this.router.navigate(['operator/movie-booking']);
  }
  goToStock() {
    this.router.navigate(['operator/manage-stock']);
  }
  goToSupport() {
    this.router.navigate(['operator/support']);
  }
  goToSettings() {
    this.router.navigate(['operator/settings']);
  }
}
