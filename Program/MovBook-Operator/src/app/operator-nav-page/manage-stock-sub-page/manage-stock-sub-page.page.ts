import { Component, OnInit } from '@angular/core';
import { OperatorService } from 'src/app/service/operator.service';

@Component({
  selector: 'app-manage-stock-sub-page',
  templateUrl: './manage-stock-sub-page.page.html',
  styleUrls: ['./manage-stock-sub-page.page.scss'],
})
export class ManageStockSubPagePage implements OnInit {
  name: string;
  email: string;
  Beverages: Object;

  constructor(
    public operatorService: OperatorService
    
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
// Remove after getting login credentials
    this.name = 'John Steve';
    this.email = 'john@movbook.com';
    this.operatorService.getBeverages().subscribe(
      (data) => {
        this.Beverages = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
