import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { EmployeeService } from './../../../services/account/employee.service'

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

  prefix: any;

  id: string;

  constructor(private employeeService: EmployeeService, private route:ActivatedRoute, private updateRoute:ActivatedRoute) { }

  UpdateForm:FormGroup
  managerID:any;
  details:any

  ngOnInit() {

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
        console.log(name + userEMail);
        this.admin_FirstName = name
        this.admin_LastName = name
        this.admin_Email = userEMail;



    this.route.paramMap.subscribe(res => {
      if (res.has('managerid')) {
        this.id = res.get('managerid');

        this.employeeService.getManagerDetailsbyID(this.id).subscribe((res)=>{
          this.prefix = res.ManagerDetails.name['prefix']
          console.log(this.prefix)
        })
      }


    })




    this.UpdateForm = new FormGroup({
      'prefix':new FormControl(null, {validators:[Validators.required]}),
      'firstName':new FormControl(null, {validators:[Validators.required]}),
      'middleName':new FormControl(null, {validators:[Validators.required]}),
      'lastName':new FormControl(null, {validators:[Validators.required]}),
      'email':new FormControl(null, {validators:[Validators.required]}),
      'password':new FormControl(null, {validators:[Validators.required]}),
      'retypePassword':new FormControl(null, {validators:[Validators.required]}),
      'phone':new FormControl(null, {validators:[Validators.required]}),
      'streetAddress':new FormControl(null, {validators:[Validators.required]}),
      'city':new FormControl(null, {validators:[Validators.required]}),
      'postalCode':new FormControl(null, {validators:[Validators.required]})

    })


    this.updateRoute.params.subscribe((res: ParamMap) => {
      //console.log("********************")
      //console.log(res)

      // if (res.has('managerid')) {
        this.managerID = res
        this.details = res['managerid']
        //console.log(this.details)
        //console.log(this.managerID)

        this.employeeService.getManagerDetailsbyID(this.details).subscribe((res) => {
          this.UpdateForm.setValue({

            prefix:res.ManagerDetails.name.prefix,
            firstName:res.ManagerDetails.name.firstName,
            middleName:res.ManagerDetails.name.middleName,
            lastName:res.ManagerDetails.name.lastName,

            email:res.ManagerDetails.email,

            password:res.ManagerDetails.password,
            retypePassword:res.ManagerDetails.retypePassword,
            phone:res.ManagerDetails.phone,
            streetAddress:res.ManagerDetails.address.streetAddress,
            city:res.ManagerDetails.address.city,
            postalCode:res.ManagerDetails.address.postalCode,
          })
          console.log("********************")
          //console.log(res)
          //console.log("********************")
        })
      // }
    })


  }

  updateSubmit(){
    this.employeeService.updateManager(
      this.UpdateForm.value.prefix,
      this.UpdateForm.value.firstName,
      this.UpdateForm.value.middleName,
      this.UpdateForm.value.lastName,
      this.UpdateForm.value.email,
      this.UpdateForm.value.phone,
      this.UpdateForm.value.streetAddress,
      this.UpdateForm.value.city,
      this.UpdateForm.value.postalCode,
      this.details)


      console.log(this.UpdateForm)

      this.UpdateForm.reset();


      //console.log(this.details)
  }





}
