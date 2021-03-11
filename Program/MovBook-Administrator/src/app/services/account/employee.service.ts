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


  //delete manager -> manager-accounts-sub-page
  deleteManager(mID: string) {
    //return this.http.delete(this.baseUrl + "api/delete/" + mID)
    return this.http.delete(this.BASE_URL + 'api/managers/delete/' + mID)

  }


  //Update Manager
  updateManager(mID: string) {

  }


  // statusMongoDB(){
  //   return this._http.get("http://localhost:3000/api/omdb/upcoming-movies/search/:movieTitle/");
  //   //return this._http.get("http://www.omdbapi.com/swagger.json")
  //     //.map(result => result);
  //     // .pipe(map(res =>{
  //     //   console.log('bla bla')
  //     // }))

  // }


  statusOMDB() {
    return this._http.get(this.BASE_URL + "api/omdb/upcoming-movies/search/tenet");
    //return this._http.get("http://localhost:3000/api/omdb/upcoming-movies/search/:movieTitle/");
    //return this._http.get("http://www.omdbapi.com/swagger.json")
    //.map(result => result);
    // .pipe(map(res =>{
    //   console.log('bla bla')
    // }))

    ////api/omdb/upcoming-movies/search/:movieTitle/

  }

  // statusStripe(){
  //   return this._http.get("http://www.omdbapi.com/?i=tt3896198&apikey=e2993149");
  //         //.map(result => result);
  //     // .pipe(map(res =>{
  //     //   console.log('bla bla')
  //     // }))
  // }




}
