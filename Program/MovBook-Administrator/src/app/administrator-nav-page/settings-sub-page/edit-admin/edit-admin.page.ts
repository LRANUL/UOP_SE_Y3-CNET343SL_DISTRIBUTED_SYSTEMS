import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { admin } from 'src/app/models/account/admin';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from './../../../services/account/employee.service'

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.page.html',
  styleUrls: ['./edit-admin.page.scss'],
  providers: [EmployeeService],
})
export class EditAdminPage implements OnInit {

  admin_Prefix: any;
  admin_FirstName: any;
  admin_LastName: any;
  admin_Email: any;
  form:FormGroup
  constructor(private employeeService: EmployeeService, private authServ:AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'prefix':new FormControl(null,{validators:[Validators.required,Validators.email]}),
      'fName':new FormControl(null,{validators:[Validators.required]}),
      'mName':new FormControl(null,{validators:[Validators.required]}),
      'lName':new FormControl(null,{validators:[Validators.required]}),
      'email':new FormControl(null,{validators:[Validators.required]}),
      'newPassword':new FormControl(null,{validators:[Validators.required]}),
      'oldPassword':new FormControl(null,{validators:[Validators.required]}),
      'phone':new FormControl(null,{validators:[Validators.required]}),
      'address':new FormControl(null,{validators:[Validators.required]}),
      'city':new FormControl(null,{validators:[Validators.required]}),
      'postCode':new FormControl(null,{validators:[Validators.required]}),
    });
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

    const userEMail = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const lname = localStorage.getItem("lastName");
    const prre =localStorage.getItem("prefix");

    this.admin_FirstName = name;
    this.admin_LastName = lname;
    this.admin_Email = userEMail




    this.employeeService.getDetails(userEMail).subscribe((res)=>{
      console.log(res)
      this.form.setValue({
      'prefix':res.name.prefix,
      'fName':res.name.firstName,
      'mName':res.name.middleName,
      'lName':res.name.lastName,
      'email':res.emailAddress,
      'phone':res.phoneNumber,
      'address':res.address.streetAddress,
      'city':res.address.city,
      'postCode':res.address.postalZipCode,
      'newPassword':"",
      'oldPassword':"",
      });

    })
  }

  onSubmit(){
    const adminData:admin ={
      emailAddress: this.admin_Email,
      name:
          {   prefix: this.form.value.prefix,
              firstName: this.form.value.fName,
              middleName: this.form.value.mName,
              lastName: this.form.value.lName,
          },
      phoneNumber: this.form.value.phone,
      address:
          {
          streetAddress: this.form.value.address,
          city: this.form.value.city,
          postalZipCode:this.form.value.postCode
          }
    }

    this.employeeService.updateAdmin(adminData);

    if((this.form.value.newPassword != "" && this.form.value.oldPassword != "") ){
      this.authServ.onUpdatePassword(this.form.value.newPassword,this.form.value.oldPassword, this.admin_Email);
    }
  }
  logout(){
    this.authServ.logOut();
  }


}


