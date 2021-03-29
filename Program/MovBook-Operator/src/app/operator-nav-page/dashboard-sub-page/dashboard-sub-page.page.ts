import { Component, OnInit } from "@angular/core";
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
  email: string;
  constructor(
    private menu: MenuController,
    public operatorService: OperatorService
  ) {}

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
// Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';
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
}
