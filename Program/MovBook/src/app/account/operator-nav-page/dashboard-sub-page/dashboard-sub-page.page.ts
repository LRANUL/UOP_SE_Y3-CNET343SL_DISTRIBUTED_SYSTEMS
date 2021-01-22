import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-sub-page',
  templateUrl: './dashboard-sub-page.page.html',
  styleUrls: ['./dashboard-sub-page.page.scss'],
})
export class DashboardSubPagePage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.open('start');
  }

}
