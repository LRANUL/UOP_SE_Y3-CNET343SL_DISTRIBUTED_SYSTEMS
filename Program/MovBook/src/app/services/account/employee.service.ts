import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/observable';
//import  'rxjs/add/operator/map';
//import  'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs'


import { Employee } from './employee'
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  

  public updatedManagerDetails:[] = [];
  public updatedAdminDetails:[] = [];
  private currentUpdateDetails = new Subject();
  
  getListner(){
    return this.currentUpdateDetails.asObservable();
  }


  selectedEmployee: Employee;
  employees: Employee[];
  
   baseUrl ='http://localhost:3000/api/post'

  constructor(public http: HttpClient) { }
  //constructor() { }

  
 

  //sidebar and profile details for admin
  getDetails(email){
    return this.http.get("http://localhost:3000/api/adminDetails?email="+email);
  }



//Add a new Manager
  postEmployee(adminDetails : NgForm){
    const user = {name: adminDetails.value.name,
                  email: adminDetails.value.email,
                  password: adminDetails.value.password,
                  status: adminDetails.value.status,
                  type: adminDetails.value.type,
                  phone: adminDetails.value.phone,
                  address: adminDetails.value.address}
    console.log(user)
    this.http.post(this.baseUrl, user).subscribe(res=>{
      console.log(res)
    });
  }


  //get manager details -> manager-accounts-sub-page
  getManagerDetails(){
   this.http.get<{message : string, ManagerDetails : any}>("http://localhost:3000/api/get").subscribe(res=>{
      this.updatedManagerDetails=res.ManagerDetails;
      console.log(this.updatedManagerDetails);
      this.currentUpdateDetails.next([...this.updatedManagerDetails]);
   })
  }

  //delete manager -> manager-accounts-sub-page
  deleteManager(mID : string){
    return this.http.delete('http://localhost:3000/api/delete/'+mID)
    
  }

}
