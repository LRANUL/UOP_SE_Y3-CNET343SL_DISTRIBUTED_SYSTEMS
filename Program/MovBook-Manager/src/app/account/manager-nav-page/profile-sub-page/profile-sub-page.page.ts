import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-profile-sub-page',
  templateUrl: './profile-sub-page.page.html',
  styleUrls: ['./profile-sub-page.page.scss'],
})
export class ProfileSubPagePage implements OnInit {

  prefix: any;
  firstName: any;
  middleName: any;
  lastName: any;
  emailAddress: any;
  phone: any;
  streetAddress: any;
  city: any;
  postalCode: any;
  registeredDateTime: any;

  constructor(
    public managerService: ManagerService,

  ) { }

  ngOnInit() {
    this.prefix=localStorage.getItem('prefix');
    this.firstName=localStorage.getItem('name');
    this.middleName=localStorage.getItem('middleName');
    this.lastName=localStorage.getItem('lastName');
    this.emailAddress=localStorage.getItem('email');



    var emailAddress = localStorage.getItem('email')
    localStorage.getItem('email')
    // this.managerService.getProfile(emailAddress).subscribe(
    //   (data) => {
    //     this.prefix = data['Prefix'];
    //     this.firstName = data['FirstName'];
    //     this.middleName = data['MiddleName'];
    //     this.lastName = data['LastName'];
    //     this.emailAddress = data['Email'];
    //     this.phone = data['Phone'];
    //     this.streetAddress = data['StreetAddress'];
    //     this.city = data['City'];
    //     this.postalCode = data['PostalCode'];
    //     this.registeredDateTime = data['RegisteredDateTime'];
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

}
