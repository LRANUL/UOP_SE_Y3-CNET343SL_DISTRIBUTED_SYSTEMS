import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { EmployeeService } from './../../../services/account/employee.service'
import { Subscription } from 'rxjs'




@Component({
  selector: 'app-manager-accounts-sub-page',
  templateUrl: './manager-accounts-sub-page.page.html',
  styleUrls: ['./manager-accounts-sub-page.page.scss'],
  providers: [EmployeeService],
})
export class ManagerAccountsSubPagePage implements OnInit,OnDestroy {

  managerArray: [] = [];

  managerSubscription : Subscription;


  constructor(private employeeService: EmployeeService) { }
  //constructor() { }

  name_admin:any;
  email_admin: any;

  name:any;
  email:any;
  password: any;
  phone: any;
  address: any;  

  ngOnDestroy(){
    this.managerSubscription.unsubscribe();
  }

  ngOnInit() {

    //sidebar Details
    var email = "10673333@students.plymouth.ac.uk";
    this.employeeService.getDetails(email).subscribe(
      (data) => {
        //console.log(data);
        this.name_admin = data['name'];
        this.email_admin = data['email'];
      },
            (error) => {
        console.log(error);
      }
    );

    //pass the data to the list
      this.employeeService.getManagerDetails();
      this.managerSubscription = this.employeeService.getListner().subscribe((res:[])=>{
        this.managerArray=res;
        this.managerArray=this.employeeService.updatedManagerDetails;
        console.log();
      })




  }
  
  //reset form
  resetForm(form?:NgForm){
    if(form)
    form.reset();
    this.employeeService.selectedEmployee = {
      name:"",
      email:"",
      password:"",
      status:"",
      type:"",
      phone:null,
      address:"",
    }

  }

  //submit form
  onSubmit(form : NgForm){
    
    //console.log(form.value);
    //console.log("****************************");
    this.employeeService.postEmployee(form);
    this.resetForm(form);
    
  }


deleteManagerHTML(id : string){
  this.employeeService.deleteManager(id).subscribe(()=>{
    this.employeeService.getManagerDetails()
    //console.log("***********************delete******************")
  })
}


}
