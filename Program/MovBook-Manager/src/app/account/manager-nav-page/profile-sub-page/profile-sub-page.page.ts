import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/account/manager.service';

@Component({
  selector: 'app-profile-sub-page',
  templateUrl: './profile-sub-page.page.html',
  styleUrls: ['./profile-sub-page.page.scss'],
})
export class ProfileSubPagePage implements OnInit {
  Prefix: any;
  FirstName: any;
  MiddleName: any;
  LastName: any;
  Email: any;
  Phone: any;
  StreetAddress: any;
  City: any;
  PostalCode: any;

  constructor(
    public managerService: ManagerService,

  ) { }

  ngOnInit() {
    var email = 'lucasanderson@gmail.com'
    localStorage.getItem('email')
    this.managerService.getProfile(email).subscribe(
      (data) => {
        this.Prefix = data['Prefix'];
        this.FirstName = data['FirstName'];
        this.MiddleName = data['MiddleName'];
        this.LastName = data['LastName'];
        this.Email = data['Email'];
        this.Phone = data['Phone'];
        this.StreetAddress = data['StreetAddress'];
        this.City = data['City'];
        this.PostalCode = data['PostalCode'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
