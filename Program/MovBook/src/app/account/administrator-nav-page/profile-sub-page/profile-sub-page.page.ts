import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../../services/account/employee.service'

@Component({
  selector: 'app-profile-sub-page',
  templateUrl: './profile-sub-page.page.html',
  styleUrls: ['./profile-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class ProfileSubPagePage implements OnInit {


  //sidebar Details & profile Details
  name_admin:any;
  email_admin: any;
  password_admin: any;
  status_admin: any;
  type_admin: any;
  phone_admin: any;
  address_admin: any; 
   

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

    //admin profile details
    var email = "10673333@students.plymouth.ac.uk";
    this.employeeService.getDetails(email).subscribe(
      (data) => {
        console.log(data);
        //console.log("*********************");
        this.name_admin = data['name'];
        this.email_admin = data['email'];
        this.password_admin = data['address'];
        this.status_admin = data['status'];
        this.type_admin = data['type'];
        this.phone_admin = data['phone'];
        this.address_admin = data['address'];
      },
      (error) => {
        console.log(error);
      }
      
    );
      
  }
 
}
