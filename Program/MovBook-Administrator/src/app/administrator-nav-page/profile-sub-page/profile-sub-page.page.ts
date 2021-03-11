import { Component, OnInit } from '@angular/core';
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
   

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

    //admin profile details
    var email = "wef";
    this.employeeService.getDetails(email).subscribe(
      (data) => {
        console.log(data);
        this.admin_Prefix = data['Prefix'],
        this.admin_FirstName = data['FirstName'],
        this.admin_MiddleName = data['MiddleName'],
        this.admin_LastName = data['LastName'],
        this.admin_Email = data['Email'],
        this.admin_Phone = data['Phone'],
        this.admin_StreetAddress = data['StreetAddress'],
        this.admin_City = data['City'],
        this.admin_PostalCode = data['PostalCode']
      },
      (error) => {
        console.log(error);
      }
      
    );
      
  }
 
}
