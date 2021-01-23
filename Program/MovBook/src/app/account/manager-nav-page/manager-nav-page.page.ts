import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-manager-nav-page',
  templateUrl: './manager-nav-page.page.html',
  styleUrls: ['./manager-nav-page.page.scss'],
})
export class ManagerNavPagePage implements OnInit {

  managerContentSubPages = [
    {
      title: 'Dashboard',
      url: '/manager/dashboard'
    },
    {
      title: 'Movie Catalog',
      url: '/manager/movie-catalog'
    }
  ];

  selectedSubPagePath = '';

  constructor(
    private router: Router
  ) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedSubPagePath = event.url;
    });
  }

  ngOnInit() {
  }

}
