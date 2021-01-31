import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { OperatorService } from "./../../../services/account/operator.service";
@Component({
  selector: "app-dashboard-sub-page",
  templateUrl: "./dashboard-sub-page.page.html",
  styleUrls: ["./dashboard-sub-page.page.scss"],
})
export class DashboardSubPagePage implements OnInit {
  Movies: Object;
  constructor(
    private menu: MenuController,
    public operatorService: OperatorService
  ) {}

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
  }
}
