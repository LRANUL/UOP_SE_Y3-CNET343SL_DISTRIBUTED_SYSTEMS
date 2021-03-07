import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { EmployeeService } from './../../../services/account/employee.service'
//import { AccountService } from '../../../services/account/account.service'
import { Chart } from 'chart.js'




@Component({
  selector: 'app-dashboard-sub-page',
  templateUrl: './dashboard-sub-page.page.html',
  styleUrls: ['./dashboard-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class DashboardSubPagePage implements OnInit {
   

  @ViewChild('barChart') barChart;
  @ViewChild('barChartStat') barChartStat;

  bars: any;
  colorArray: any;

  admin_Prefix: any;
  admin_FirstName: any;
  admin_LastName: any;
  admin_Email: any;

  jsonResponse: any;

  constructor(private employeeService: EmployeeService, private MongoDBStatus: EmployeeService, private omdbStatus: EmployeeService, private StripeStatus: EmployeeService) { }

  //BarChart Function
  ionViewDidEnter() {
    this.createBarChart();
    this.barChartStatis();
  }

  ngOnInit() {
    //sidebar details
    var Email = "wef";
    this.employeeService.getDetails(Email).subscribe(
      (data) => {
        //console.log(data);

        //name/email = backend
        // this.name_admin = data['name'];
        // this.email_admin = data['email'];
        this.admin_Prefix = data['Prefix'];
        this.admin_FirstName = data['FirstName'];
        this.admin_LastName = data['LastName'];
        this.admin_Email = data['Email'];
      },
      (error) => {
        console.log(error);
      }
    );

    //MongoDB statistics
    // this.MongoDBStatus.statusMongoDB().subscribe((res)=>{
    //   console.log(res);
    // })


    //omdb statistic
    this.omdbStatus.statusOMDB().subscribe(
      (res) => {
        //console.log("********////////////////////********");
        console.log(res);
        let value = JSON.stringify(res);
        this.jsonResponse = res['Response'];
        console.log(value);
        
        //let temp = res['list']
        
      })

    //  this.StripeStatus.statusStripe().subscribe((res)=>{
    //    console.log(res)
    //  })
    

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
