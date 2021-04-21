import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from './../../services/account/employee.service'

@Component({
  selector: 'app-profile-sub-page',
  templateUrl: './profile-sub-page.page.html',
  styleUrls: ['./profile-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class ProfileSubPagePage implements OnInit {


  //sidebar Details & profile Details
  admin_Prefix: any;
  admin_FirstName: any;
  admin_MiddleName: any;
  admin_LastName: any;
  admin_Email: any;
  admin_Phone: any;
  admin_StreetAddress: any;
  admin_City: any;
  admin_PostalCode: any;


  constructor(private employeeService: EmployeeService, private authServ:AuthService) { }

  ngOnInit() {
      const userEMail = localStorage.getItem("email");
        const name = localStorage.getItem("name");
        const lname = localStorage.getItem("lastName");
        const prre =localStorage.getItem("prefix");
        console.log(name + userEMail);
        this.admin_FirstName = name
        this.admin_LastName = lname
        this.admin_Email = userEMail;
        this.admin_Prefix = prre

    //admin profile details
    var email = this.admin_Email;
    this.employeeService.getDetails(email).subscribe(
      (data) => {
        console.log(data);
        // this.admin_Prefix = data['Prefix'],
        // this.admin_FirstName = data['FirstName'],
        // this.admin_MiddleName = data['MiddleName'],
        // this.admin_LastName = data['LastName'],
        // this.admin_Email = data['email'],
        this.admin_Phone = data.phoneNumber,
        this.admin_StreetAddress = data.address.streetAddress,
        this.admin_City = data.address.city,
        this.admin_PostalCode = data.address.postalZipCode;
      },
      (error) => {
        console.log(error);
      }

    );

  }

  logout(){
    this.authServ.logOut();
  }

}
