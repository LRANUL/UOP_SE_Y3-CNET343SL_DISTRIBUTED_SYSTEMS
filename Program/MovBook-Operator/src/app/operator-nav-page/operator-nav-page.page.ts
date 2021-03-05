import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-operator-nav-page',
  templateUrl: './operator-nav-page.page.html',
  styleUrls: ['./operator-nav-page.page.scss'],
})
export class OperatorNavPagePage implements OnInit {

  Pages = [
    {
      title: 'Dashboard',
      url: '/operator/dashboard'
    },
    {
      title: 'Booking',
      url: '/operator/movie-booking'
    }
  ]

  pageRoute = '';

  constructor(private router: Router,private menu: MenuController) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.pageRoute = event.url;
    })
  }

  ngOnInit() {
    this.menu.open('start');
  }

}
