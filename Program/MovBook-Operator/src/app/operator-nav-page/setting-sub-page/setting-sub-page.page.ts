import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorService } from "./../../service/operator.service";


@Component({
  selector: 'app-setting-sub-page',
  templateUrl: './setting-sub-page.page.html',
  styleUrls: ['./setting-sub-page.page.scss'],
})
export class SettingSubPagePage implements OnInit {
  
  Name:any;
  Email: any;
  Address: any;
  Phone: any;
  Type: any;
  name: string;
  email: string;

  constructor(
    public operatorService: OperatorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
// Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';
    this.operatorService.getProfile(this.email).subscribe(
      (data) => {
        this.Name = data['name'];
        this.Email = data['email'];
        this.Address = data['address'];
        this.Phone = data['phone'];
        this.Type = data['type'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /** Navigation */
  goToDashboard() {
    this.router.navigate(['operator']);
  }
  goToBooking() {
    this.router.navigate(['operator/movie-booking']);
  }
  goToStock() {
    this.router.navigate(['operator/manage-stock']);
  }
  goToSupport() {
    this.router.navigate(['operator/support']);
  }
  goToSettings() {
    this.router.navigate(['operator/settings']);
  }

}
