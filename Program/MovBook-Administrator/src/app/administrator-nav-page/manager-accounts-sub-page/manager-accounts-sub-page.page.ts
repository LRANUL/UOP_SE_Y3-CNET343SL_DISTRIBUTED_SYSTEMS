import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { EmployeeService } from './../../services/account/employee.service'
import { Subscription } from 'rxjs'




@Component({
  selector: 'app-manager-accounts-sub-page',
  templateUrl: './manager-accounts-sub-page.page.html',
  styleUrls: ['./manager-accounts-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class ManagerAccountsSubPagePage implements OnInit, OnDestroy {

  managerArray: [] = [];

  managerSubscription: Subscription;


  constructor(private employeeService: EmployeeService) { }
  //constructor() { }

  //Angular Page
  admin_Prefix: any;
  admin_FirstName: any;
  admin_LastName: any;
  admin_Email: any;


  //Angular Page
  prefix: any;
  firstName: any;
  middleName: any;
  lastName: any;
  email: any;
  password: any;
  retypePassword: any;
  phone: any;
  streetAddress: any;
  city: any;
  postalCode: any;


  // name: any;
  // email: any;
  // password: any;
  // phone: any;
  // address: any;

  ngOnDestroy() {
    this.managerSubscription.unsubscribe();
  }

  ngOnInit() {

    //sidebar Details
    // var Email = "wef";
    // this.employeeService.getDetails(Email).subscribe(
    //   (data) => {
    //     //console.log(data);

    //     //name/email = backend
    //     // this.name_admin = data['name'];
    //     // this.email_admin = data['email'];
    //     this.admin_Prefix = data['Prefix'];
    //     this.admin_FirstName = data['FirstName'];
    //     this.admin_LastName = data['LastName'];
    //     this.admin_Email = data['Email'];
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    this.admin_FirstName = "admin"
    this.admin_LastName = "admin"
    this.admin_Email = "admin@gmail.com"



    //pass the data to the list
    this.employeeService.getManagerDetails();
    this.managerSubscription = this.employeeService.getListner().subscribe((res: []) => {
      this.managerArray = res;
      this.managerArray = this.employeeService.updatedManagerDetails;
      //console.log();
    })
  }



  //submit form
  onSubmit(form: NgForm) {
    this.employeeService.postEmployee(form);
    this.resetForm(form);
  }

  //deleteManager
  deleteAManager(id: string) {
    this.employeeService.deleteManager(id).subscribe(() => {
      this.employeeService.getManagerDetails()
    })
  }

  //reset form
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      email: "",
      name: {
        prefix: "",
        firstName: "",
        middleName: "",
        lastName: ""
      },
      // Prefix: "",
      // FirstName: "",
      // MiddleName: "",
      // LastName: "",

      password: "",
      retypePassword: "",
      phone: null,
      address: {
        streetAddress: "",
        city: "",
        postalCode: ""
      },
    }

  }


}
