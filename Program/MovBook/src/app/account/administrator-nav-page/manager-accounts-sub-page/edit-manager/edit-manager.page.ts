import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../../../services/account/employee.service'

@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.page.html',
  styleUrls: ['./edit-manager.page.scss'],
  providers: [EmployeeService],
})
export class EditManagerPage implements OnInit {

  admin_Prefix: any;
  admin_FirstName: any;
  admin_LastName: any;
  admin_Email: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

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

}
