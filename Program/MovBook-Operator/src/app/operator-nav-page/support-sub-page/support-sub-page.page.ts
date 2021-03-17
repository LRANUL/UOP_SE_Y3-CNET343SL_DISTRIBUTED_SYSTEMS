import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-sub-page',
  templateUrl: './support-sub-page.page.html',
  styleUrls: ['./support-sub-page.page.scss'],
})
export class SupportSubPagePage implements OnInit {
  name: string;
  email: string;

  constructor() { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
// Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';
  }

}
