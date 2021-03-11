import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../services/account/employee.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings-sub-page',
  templateUrl: './settings-sub-page.page.html',
  styleUrls: ['./settings-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class SettingsSubPagePage implements OnInit {

  admin_Prefix: any;
  admin_FirstName: any;
  admin_LastName: any;
  admin_Email: any;
  

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

        //sidebar Details
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
  }

  onSubmit(form : NgForm){
          
    // if(this.email_admin == this.emailValidation){
    //   console.log("Data Matched");
    // }else {
    //   console.log(this.email_admin)
    //   console.log("Data not Matching")
    // }

  }

}
