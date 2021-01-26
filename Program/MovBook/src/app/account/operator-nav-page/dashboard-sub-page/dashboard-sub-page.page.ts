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
  // Movies: {
  //   title: string;
  //   description: any;
  // }[];
  constructor(
    private menu: MenuController,
    public operatorService: OperatorService
  ) {}

  ngOnInit() {
    console.log("T1");
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

  // getAllMovies() {
  //   var MongoClient = require('mongodb').MongoClient;
  //   var url = "mongodb+srv://test:test@movbook-db-primary.axmm8.mongodb.net/MovBook-DB-Primary?retryWrites=true&w=majority";

  //   MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;
  //     db.collection("Movies").find({}).toArray(function(err, result) {
  //       if (err) throw err;
  //       this.Movies = result.map((e) => {
  //         console.log(e.payload.doc);
  //         return {
  //           title: e.payload.doc.data()["title"],
  //           description: e.payload.doc.data()["description"],
  //         };
  //       });
  //       console.log(result);
  //       db.close();
  //     });
  //   });
  // }
}
