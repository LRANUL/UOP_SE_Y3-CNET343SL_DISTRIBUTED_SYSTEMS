import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { EmployeeService } from './../../services/account/employee.service'
//import { AccountService } from '../../../services/account/account.service'
import { Chart } from 'chart.js'
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-dashboard-sub-page',
  templateUrl: './dashboard-sub-page.page.html',
  styleUrls: ['./dashboard-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class DashboardSubPagePage implements OnInit {


  @ViewChild('barChart') barChart;
  @ViewChild('barChartStat') barChartStat;

  jsonResponse: any;
  headers: any;
  splitStatus: any;
  splitAddress: any;

  jsonResponseStripe: any;
  headersStripe: any;
  splitStatusStripe: any;
  splitAddressStripe: any;


  jsonResponseManager: any;
  headersManager: any;
  splitStatusManager: any;
  splitAddressManager: any;


  bars: any;
  colorArray: any;




  //jsonResponse: any;
  public headerStat: any;
  public errorMsg;

  constructor(private employeeService: EmployeeService, private handle: EmployeeService, private authServ: AuthService) { }

  //BarChart Function
  ionViewDidEnter() {
    this.createBarChart();
    this.barChartStatis();
  }

  admin_Prefix: any;
  admin_FirstName: any;
  admin_LastName: any;
  admin_Email: string;


  ngOnInit() {
    const token = localStorage.getItem("token");


    const userEMail = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const lname = localStorage.getItem("lastName");
    console.log(name + userEMail);
    this.admin_FirstName = name
    this.admin_LastName = lname
    this.admin_Email = userEMail;


    //omdb statistic
    this.employeeService.statusOMDB().subscribe(
      (res) => {
        //console.log("********////////////////////********");
        console.log(res);
        let value = JSON.stringify(res);
        this.jsonResponse = res['Response'];
        if (res['Response'] == "True") {
          var status = "Status Code 200"
          this.splitStatus = status;
          this.splitAddress = "api/omdb/upcoming-movies/search/tenet";
        }

      });


    this.employeeService.statusOMDB().subscribe((data) =>
      this.headerStat = data,
      error => {
        this.errorMsg = error;

        this.headers = this.errorMsg.split(":")
        this.splitStatus = this.headers[3];
        this.headers = this.errorMsg.split(":")
        this.splitAddress = this.headers[2];
        this.jsonResponse = "Server Error"
      },

    );


    //Stripe statistic
    this.employeeService.statusStripe().subscribe(
      (res) => {
        //console.log("********////////////////////********");
        console.log(res);
        let value = JSON.stringify(res);
        this.jsonResponseStripe = res['Response'];
        if (res['Response'] == "True") {
          var status = "Status Code 200"
          this.splitStatusStripe = status;
          this.splitAddressStripe = "https://movbook-admin.herokuapp.com/api/stripe-status";
        }

      });


    this.employeeService.statusStripe().subscribe((data) =>
      this.headerStat = data,
      error => {
        this.errorMsg = error;

        this.headersStripe = this.errorMsg.split(":")
        this.splitStatusStripe = this.headersStripe[2];
        this.headersStripe = this.errorMsg.split(":")
        this.splitAddressStripe = this.headersStripe[1];
        this.jsonResponseStripe = "Server Error"
      },

    );



    //managerStatus
    this.employeeService.managerStatus().subscribe(
      (res) => {
        //console.log("********////////////////////********");
        console.log(res);
        let value = JSON.stringify(res);
        this.jsonResponseManager = res['message'];
        // console.log(value)
        if (res['message'] == "Data Retrieved") {
          var status = "Status Code 200"
          this.splitStatusManager = status;
          //this.splitAddressManager = "api/managers/get/";
        }

      });

    //Error Handling
    this.employeeService.managerStatus().subscribe((data) =>
      this.headerStat = data,
      error => {
        this.errorMsg = error;

        this.headersManager = this.errorMsg.split(":")
        console.log(this.headersManager)
        this.splitStatusManager = this.headersManager[3];
        console.log(this.splitStatusManager)
        this.headersManager = this.errorMsg.split(":")
        this.splitAddressManager = this.headersManager[2];
        this.jsonResponseManager = "Server Error"

      },
    );
  }



  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
        datasets: [{
          label: 'Users In Database - 2021',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17, 12, 9, 16, 13],
          backgroundColor: 'rgb(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 229)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }, {
          label: 'Users In Database - 2020',
          data: [1.5, 2.8, 4, 4.9, 3.9, 4.5, 7, 6, 8, 13, 10, 14],
          backgroundColor: '#dd1144', // array should have same number of elements as number of dataset
          borderColor: '#dd1144',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  barChartStatis() {
    this.bars = new Chart(this.barChartStat.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Admins', 'Managers', 'Operators', 'Users'],
        datasets: [{
          label: 'Statistics - 2021',
          data: [10, 25, 30, 1500],
          backgroundColor: 'rgb(37, 182, 8)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(37, 182, 8)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }, {
          label: 'Statistics - 2020',
          data: [9, 20, 42, 1300],
          backgroundColor: '#70a9ff', // array should have same number of elements as number of dataset
          borderColor: '#70a9ff',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }




}
