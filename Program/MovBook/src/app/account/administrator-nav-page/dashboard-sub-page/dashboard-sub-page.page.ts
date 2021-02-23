import { Component, OnInit } from '@angular/core';
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

  name_admin:any;
  email_admin: any;
  
  chart: [];

  constructor(private employeeService: EmployeeService , private MongoDBStatus : EmployeeService , private omdbStatus : EmployeeService , private StripeStatus : EmployeeService) { }
  

  ngOnInit() {
    //sidebar details
    var email = "10673333@students.plymouth.ac.uk";
    this.employeeService.getDetails(email).subscribe(
      (data) => {
        console.log(data);
        //console.log("*********************");
        this.name_admin = data['name'];
        this.email_admin = data['email'];    
      },
            (error) => {
        console.log(error);
      }
    );

//MongoDB statistics
    this.MongoDBStatus.statusMongoDB().subscribe((res)=>{
      console.log(res);
    })




//omdb statistic
     this.omdbStatus.statusOMDB().subscribe(
       (res) => {
       //console.log("********////////////////////********");
       console.log(res);
       //let temp = res['list']
     })

     this.chart = new Chart('canvas',{
       type: 'line',
       data: {}
     })




     this.StripeStatus.statusStripe().subscribe((res)=>{
       console.log(res)
     })
 
  }



  



}
