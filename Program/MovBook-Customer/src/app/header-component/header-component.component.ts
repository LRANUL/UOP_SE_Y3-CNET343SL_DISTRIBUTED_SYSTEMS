import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  profileNav()
  {
   this.router.navigate(['customer/profile'])
  }

  messageNav()
  {
   this.router.navigate(['customer/chat'])
  }
}
