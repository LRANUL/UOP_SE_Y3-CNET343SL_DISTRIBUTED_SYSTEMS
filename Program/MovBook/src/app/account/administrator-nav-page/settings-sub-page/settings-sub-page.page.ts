import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../../services/account/employee.service'

@Component({
  selector: 'app-settings-sub-page',
  templateUrl: './settings-sub-page.page.html',
  styleUrls: ['./settings-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class SettingsSubPagePage implements OnInit {

  name_admin:any;
  email_admin: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

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
  }

}
