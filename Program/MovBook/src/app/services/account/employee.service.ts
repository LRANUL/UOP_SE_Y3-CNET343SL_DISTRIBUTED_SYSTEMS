import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/observable';
//import  'rxjs/add/operator/map';
//import  'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs'
import { environment } from "src/environments/environment";

import { Employee } from 'src/app/models/account/employee'
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_URL = environment.MOVBOOK_BACKEND_URL;
  private baseUrl = 'http://localhost:3000/';


  public updatedManagerDetails: [] = [];
  public updatedAdminDetails: [] = [];
  private currentUpdateDetails = new Subject();

  getListner() {
    return this.currentUpdateDetails.asObservable();
  }


  selectedEmployee: Employee;
  employees: Employee[];

  //baseUrl ='http://localhost:3000/api/post'

  constructor(public http: HttpClient , private _http: HttpClient) { }
  //constructor() { }




  //sidebar and profile details for admin
  getDetails(email) {
    //return this.http.get(this.baseUrl + "api/adminDetails?email=" + email);
    return this.http.get(this.BASE_URL + "api/adminDetails?email="+email);
  }



  //Add a new Manager
  postEmployee(adminDetails: NgForm) {
    const user = {
      name: adminDetails.value.name,
      email: adminDetails.value.email,
      password: adminDetails.value.password,
      phone: adminDetails.value.phone,
      address: adminDetails.value.address
    }
    console.log(user)
    //this.http.post(this.baseUrl + "api/post", user).subscribe(res => {
    this.http.post(this.BASE_URL, user).subscribe(res=>{
      console.log(res)
    });
  }


  //get manager details -> manager-accounts-sub-page
  getManagerDetails() {
    //this.http.get<{ message: string, ManagerDetails: any }>(this.baseUrl + "api/get/").subscribe(res => {
    this.http.get<{message : string, ManagerDetails : any}>(this.BASE_URL + "api/get").subscribe(res=>{
      this.updatedManagerDetails = res.ManagerDetails;
      console.log(this.updatedManagerDetails);
      this.currentUpdateDetails.next([...this.updatedManagerDetails]);
    })
  }


  //delete manager -> manager-accounts-sub-page
  deleteManager(mID: string) {
    //return this.http.delete(this.baseUrl + "api/delete/" + mID)
    return this.http.delete(this.BASE_URL + 'api/delete/'+ mID)

  }


  

  statusMongoDB(){
    return this._http.get("http://www.omdbapi.com/?i=tt3896198&apikey=e2993149");
    //return this._http.get("http://www.omdbapi.com/swagger.json")
      //.map(result => result);
      // .pipe(map(res =>{
      //   console.log('bla bla')
      // }))
      
  }


  statusOMDB(){
    return this._http.get("http://www.omdbapi.com/?i=tt3896198&apikey=e2993149");
    //return this._http.get("http://www.omdbapi.com/swagger.json")
      //.map(result => result);
      // .pipe(map(res =>{
      //   console.log('bla bla')
      // }))
      
  }

  statusStripe(){
    return this._http.get("http://www.omdbapi.com/?i=tt3896198&apikey=e2993149");
          //.map(result => result);
      // .pipe(map(res =>{
      //   console.log('bla bla')
      // }))
  }




}
