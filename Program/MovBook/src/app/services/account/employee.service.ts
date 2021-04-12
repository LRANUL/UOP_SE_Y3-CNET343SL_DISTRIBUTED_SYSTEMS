import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//
//import  'rxjs/add/operator/map';
//import  'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs'
import { environment } from "src/environments/environment";

import { Employee } from 'src/app/models/account/employee'
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/observable';
// // import 'rxjs/add/operator/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private BASE_URL = environment.MOVBOOK_BACKEND_URL;
  //private baseUrl = 'http://localhost:3000/';

  public updatedManagerDetails: [] = [];
  public updatedAdminDetails: [] = [];
  private currentUpdateDetails = new Subject();

  getListner() {
    return this.currentUpdateDetails.asObservable();
  }

  selectedEmployee: Employee;
  employees: Employee[];

  //baseUrl ='http://localhost:3000/api/post'

  constructor(public http: HttpClient, private _http: HttpClient) { }


  //sidebar and profile details for admin
  getDetails(Email) {
    //return this.http.get(this.baseUrl + "api/adminDetails?email=" + email);
    return this.http.get(this.BASE_URL + "api/managers?Email=" + Email);
  }



  //Add a new Manager
  postEmployee(adminDetails: NgForm) {
    const manager = {
      Prefix: adminDetails.value.Prefix,
      FirstName: adminDetails.value.FirstName,
      MiddleName: adminDetails.value.MiddleName,
      LastName: adminDetails.value.LastName,
      Email: adminDetails.value.Email,
      Password: adminDetails.value.Password,
      RetypePassword: adminDetails.value.RetypePassword,
      Phone: adminDetails.value.Phone,
      StreetAddress: adminDetails.value.StreetAddress,
      City: adminDetails.value.City,
      PostalCode: adminDetails.value.PostalCode,

    }
    console.log(manager)
    //this.http.post(this.baseUrl + "api/post", manager).subscribe(res => {
    this.http.post(this.BASE_URL + "api/managers/post", manager).subscribe(res => {
      console.log(res)
    });
  }


  //get manager details -> manager-accounts-sub-page
  getManagerDetails() {
    //this.http.get<{ message: string, ManagerDetails: any }>(this.baseUrl + "api/get/").subscribe(res => {
    this.http.get<{ message: string, ManagerDetails: any }>(this.BASE_URL + "api/managers/get/").subscribe(res => {
      this.updatedManagerDetails = res.ManagerDetails;
      console.log(this.updatedManagerDetails);
      this.currentUpdateDetails.next([...this.updatedManagerDetails]);
    })
  }



  //get manager details by ID -> manager-accounts-sub-page
  getManagerDetailsbyID(id: string) {
    //console.log(id)
    //this.http.get<{ message: string, ManagerDetails: any }>(this.baseUrl + "api/get/").subscribe(res => {
    return this.http.get<{ message: string, ManagerDetails: any }>(this.BASE_URL + "api/managers/get/" + id)
    
  }


  //delete manager -> manager-accounts-sub-page
  deleteManager(mID: string) {
    //return this.http.delete(this.baseUrl + "api/delete/" + mID)
    return this.http.delete(this.BASE_URL + 'api/managers/delete/' + mID)

  }


  //Update Manager
  updateManager(Prefix: string, FirstName: string, MiddleName: string, LastName: string, Email: string, Phone: string, StreetAddress: string, City: string, PostalCode: string, id: string) {

    let updatedData: Employee;
    let phoneNO: number = +Phone
    updatedData = {Prefix:Prefix,FirstName:FirstName,MiddleName:MiddleName,LastName:LastName,Email:Email,Phone:phoneNO,StreetAddress:StreetAddress,City:City,PostalCode:PostalCode}
    this.http.put(this.BASE_URL + "api/managers/update/" + id, updatedData).subscribe(res=>{
      console.log(res)
    })
  }


  statusOMDB() {
    return this._http.get(this.BASE_URL + "api/omdb/upcoming-movies/search/tenet")
      .catch(this.errorHandler);
  }


  statusStripe(){
    return this._http.get("status.stripe.com")
  }

  managerStatus() {
    return this._http.get(this.BASE_URL + "api/managers/get/")
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }


 
}
