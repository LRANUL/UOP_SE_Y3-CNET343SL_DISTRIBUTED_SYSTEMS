import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap  } from '@angular/router';
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

  Prefix: any;

  id: string;

  constructor(private employeeService: EmployeeService, private route:ActivatedRoute, private updateRoute:ActivatedRoute) { }

  UpdateForm:FormGroup
  managerID:any;
  details:any

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



    this.route.paramMap.subscribe(res => {
      if (res.has('managerid')) {
        this.id = res.get('managerid');

        this.employeeService.getManagerDetailsbyID(this.id).subscribe((res)=>{
          this.Prefix = res.ManagerDetails['Prefix']
          //console.log(this.Prefix)
        })
      }


    })




    this.UpdateForm = new FormGroup({
      'Prefix':new FormControl(null, {validators:[Validators.required]}),
      'FirstName':new FormControl(null, {validators:[Validators.required]}),
      'MiddleName':new FormControl(null, {validators:[Validators.required]}),
      'LastName':new FormControl(null, {validators:[Validators.required]}),
      'Email':new FormControl(null, {validators:[Validators.required]}),
      'Password':new FormControl(null, {validators:[Validators.required]}),
      'RetypePassword':new FormControl(null, {validators:[Validators.required]}),
      'Phone':new FormControl(null, {validators:[Validators.required]}),
      'StreetAddress':new FormControl(null, {validators:[Validators.required]}),
      'City':new FormControl(null, {validators:[Validators.required]}),
      'PostalCode':new FormControl(null, {validators:[Validators.required]})
      
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
            Prefix:res.ManagerDetails.Prefix,
            FirstName:res.ManagerDetails.FirstName,
            MiddleName:res.ManagerDetails.MiddleName,
            LastName:res.ManagerDetails.LastName,
            Email:res.ManagerDetails.Email,
            Password:res.ManagerDetails.Password,
            RetypePassword:res.ManagerDetails.RetypePassword,
            Phone:res.ManagerDetails.Phone,
            StreetAddress:res.ManagerDetails.StreetAddress,
            City:res.ManagerDetails.City,
            PostalCode:res.ManagerDetails.PostalCode,
          })
          //console.log("********************")
          //console.log(res)
          //console.log("********************")
        })
      // }
    })


  }

  updateSubmit(){
    this.employeeService.updateManager(
      this.UpdateForm.value.Prefix,
      this.UpdateForm.value.FirstName,
      this.UpdateForm.value.MiddleName,
      this.UpdateForm.value.LastName,
      this.UpdateForm.value.Email,
      this.UpdateForm.value.Phone,
      this.UpdateForm.value.StreetAddress,
      this.UpdateForm.value.City,
      this.UpdateForm.value.PostalCode,
      this.details)


      console.log(this.UpdateForm)

      this.UpdateForm.reset();


      //console.log(this.details)
  }





}
